import os
import json
import datetime
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_PATH = os.path.join(BASE_DIR, 'bot', 'queue.json')
FALLBACK_POSTS = os.path.join(BASE_DIR, 'src', 'data', 'fallbackPosts.json')
FALLBACK_STATS = os.path.join(BASE_DIR, 'src', 'data', 'fallbackStats.json')
DB_PATH = os.path.join(BASE_DIR, '.data', 'db.json')
ARTICLES_DB = os.path.join(BASE_DIR, 'bot', 'articles_db.json')

def load_json(path):
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding='utf-8-sig') as f:
        return json.load(f)

def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def publish_next():
    queue = load_json(QUEUE_PATH)
    if not queue:
        print("[BOT] No queue found.")
        return False

    next_article = None
    for item in queue:
        if not item.get("published", False):
            next_article = item
            break

    if not next_article:
        print("[BOT] All articles in the queue have been published!")
        return False

    print(f"\n[BOT] Publishing next queued article: [{next_article['id']}] {next_article['title']}")
    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    next_article["createdAt"] = now_iso
    next_article["updatedAt"] = now_iso
    next_article["status"] = "published"

    # Clean up queue-specific fields for the website post object
    post_data = {k: v for k, v in next_article.items() if k not in ["published", "publishedAt", "facebookPost", "geminiPrompt"]}

    # 1. Update fallbackPosts.json
    posts = load_json(FALLBACK_POSTS) or []
    posts = [p for p in posts if p.get('id') != post_data['id'] and p.get('slug') != post_data['slug']]
    posts.insert(0, post_data)
    save_json(FALLBACK_POSTS, posts)
    print(f"[BOT] Injected into fallbackPosts.json (Total: {len(posts)})")

    # 2. Update fallbackStats.json
    stats = load_json(FALLBACK_STATS) or {}
    if 'h' in stats and 'posts' in stats['h']:
        stats['h']['posts'][post_data['id']] = json.dumps(post_data)
        save_json(FALLBACK_STATS, stats)
        print(f"[BOT] Updated fallbackStats.json with {post_data['id']}")

    # 3. Update .data/db.json
    db = load_json(DB_PATH)
    if db and 'h' in db and 'posts' in db['h']:
        db['h']['posts'][post_data['id']] = json.dumps(post_data)
        save_json(DB_PATH, db)
        print(f"[BOT] Updated .data/db.json with {post_data['id']}")

    # 4. Update bot/articles_db.json
    bot_db = load_json(ARTICLES_DB) or []
    bot_db = [b for b in bot_db if b.get('id') != post_data['id']]
    bot_entry = {
        "id": post_data["id"],
        "title": post_data["title"],
        "slug": post_data["slug"],
        "url": f"https://www.90stvmemories.com/posts/{post_data['slug']}",
        "image": post_data.get("imageUrl", ""),
        "excerpt": post_data.get("excerpt", ""),
        "posted_blogger": False,
        "posted_pinterest": False,
        "posted_quora": False,
        "last_posted_date": now_iso,
        "imageUrl": post_data.get("imageUrl", ""),
        "coverImage": post_data.get("coverImage", "")
    }
    bot_db.insert(0, bot_entry)
    save_json(ARTICLES_DB, bot_db)
    print(f"[BOT] Updated articles_db.json (Total: {len(bot_db)})")

    # Mark as published in queue
    next_article["published"] = True
    next_article["publishedAt"] = now_iso
    save_json(QUEUE_PATH, queue)
    print(f"[BOT] Marked {next_article['id']} as published in queue.json")
    print(f"[SUCCESS] Article is now live: https://www.90stvmemories.com/posts/{post_data['slug']}")

    # 5. Ping Search Engines
    ping_search_engines()
    return True

def ping_search_engines():
    import urllib.request
    sitemap_url = "https://www.90stvmemories.com/sitemap.xml"
    endpoints = [
        f"https://www.google.com/ping?sitemap={sitemap_url}",
        f"https://www.bing.com/ping?sitemap={sitemap_url}"
    ]
    for ep in endpoints:
        try:
            req = urllib.request.Request(ep, headers={'User-Agent': 'Mozilla/5.0 (compatible; 90sTVMemoriesBot/1.0)'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                print(f"[BOT] Pinged search engine sitemap: {ep} (Status: {resp.status})")
        except Exception as e:
            print(f"[BOT] Ping notice for {ep}: {e}")

if __name__ == "__main__":
    publish_next()
