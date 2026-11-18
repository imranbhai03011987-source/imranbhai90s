import type { Post } from "./posts";

/** High-quality authentic show images matched automatically by slug */
export const SHOW_IMAGES: Record<string, string> = {
  "home-improvement": "/images/articles/home-improvement.jpg",
  "wilson": "/images/articles/home-improvement.jpg",
  "full-house": "/images/articles/full-house.jpg",
  "tanner": "/images/articles/full-house.jpg",
  "fresh-prince": "/images/articles/fresh-prince.jpg",
  "uncle-phil": "/images/articles/fresh-prince.jpg",
  "bel-air": "/images/articles/fresh-prince.jpg",
  "beverly-hills": "/images/articles/beverly-hills-90210.jpg",
  "90210": "/images/articles/beverly-hills-90210.jpg",
  "luke-perry": "/images/articles/luke-perry.jpg",
  "dylan-mckay": "/images/articles/luke-perry.jpg",
  "saved-by-the-bell": "/images/articles/saved-by-the-bell.jpg",
  "dustin-diamond": "/images/articles/saved-by-the-bell.jpg",
  "family-matters": "/images/articles/family-matters.jpg",
  "urkel": "/images/articles/family-matters.jpg",
  "judy-winslow": "/images/articles/family-matters.jpg",
  "friends": "/images/articles/friends.jpg",
  "central-perk": "/images/articles/friends.jpg",
  "charmed": "/images/articles/charmed.jpg",
  "halliwell": "/images/articles/charmed.jpg",
  "prue": "/images/articles/charmed.jpg",
  "boy-meets-world": "/images/articles/boy-meets-world.jpg",
  "turner": "/images/articles/boy-meets-world.jpg",
  "married-with-children": "/images/articles/married-with-children.jpg",
  "bundy": "/images/articles/married-with-children.jpg",
  "70s-show": "/images/articles/that-70s-show.jpg",
  "90s-show": "/images/articles/that-70s-show.jpg",
  "teen-tv": "/images/articles/beverly-hills-90210.jpg",
  "pokemon": "/images/articles/pokemon.jpg",
  "porygon": "/images/articles/pokemon.jpg",
  "sister-sister": "/images/articles/sister-sister.jpg",
  "dawsons-creek": "/images/articles/dawsons-creek.jpg",
  "sabrina": "/images/articles/sabrina-teenage-witch.jpg",
  "robin-williams": "/images/articles/robin-williams.jpg",
  "mork": "/images/articles/robin-williams.jpg",
  "hottest-male": "/images/articles/hottest-male-actors.jpg",
  "forgotten": "/images/articles/forgotten-90s-shows.jpg",
  "attic": "/images/articles/forgotten-90s-shows.jpg",
  "boss": "/images/articles/forgotten-90s-shows.jpg",
};

export const BANNER_IMAGE = "/images/stock/banner.jpg";
export const NIGHT_IMAGE = "/images/stock/night.jpg";

/** 
 * Returns the post's cover if valid. 
 * Automatically matches every 90s TV show article to its authentic, high-res show image!
 */
export const coverUrl = (post: Pick<Post, "imageUrl" | "slug">) => {
  const url = post.imageUrl;

  // 1. If admin user uploaded a custom cover via Cloudinary, data URL, or specific direct link
  if (url && (url.startsWith("data:") || url.includes("cloudinary.com"))) {
    return url;
  }

  // 2. High-precision authentic show detection by slug
  const slugLower = (post.slug || "").toLowerCase();
  for (const [key, thematicImg] of Object.entries(SHOW_IMAGES)) {
    if (slugLower.includes(key)) {
      return thematicImg;
    }
  }

  // 3. If url points to an article-specific image
  if (url && url.startsWith("/images/articles/")) {
    return url;
  }

  // 4. Default authentic 90s retro TV graphic
  return "/images/articles/forgotten-90s-shows.jpg";
};
