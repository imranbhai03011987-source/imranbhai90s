import type { ReactNode } from "react";

const safeUrl = (u: string) => /^(https?:\/\/|data:image\/|\/(?!\/))/.test(u);

export const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;
export const MEDIA_RE = /^!\[([^\]]*)\]\(([^)\s]+)\)(?:\{([^}]*)\})?$/;

export type Align = "left" | "center" | "right";

/** Parses the `{w=60 align=left}` suffix of an image/video line. */
export function parseMediaAttrs(s?: string): { w: number; align: Align } {
  const out: { w: number; align: Align } = { w: 100, align: "center" };
  for (const m of (s ?? "").matchAll(/(\w+)=(\w+)/g)) {
    if (m[1] === "w") out.w = Math.min(100, Math.max(10, Number(m[2]) || 100));
    if (m[1] === "align" && (m[2] === "left" || m[2] === "center" || m[2] === "right")) out.align = m[2];
  }
  return out;
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link && safeUrl(link[2])) {
      const external = link[2].startsWith("http");
      return (
        <a key={i} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/**
 * Tiny markdown subset: ## heading, > quote, - list, blank-line paragraphs, **bold**, *italic*, [text](url).
 * Media (image or video) on its own line: ![caption](url){w=60 align=center}
 */
export function Prose({ content }: { content: string }) {
  if (content.includes("<div") || content.includes("<p") || content.includes("<img")) {
    return <div className="prose-90s" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  const blocks = content.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <div className="prose-90s">
      {blocks.map((b, i) => {
        const t = b.trim();
        if (!t) return null;

        const media = t.match(MEDIA_RE);
        if (media && safeUrl(media[2])) {
          const { w, align } = parseMediaAttrs(media[3]);
          return (
            <figure key={i} className={`media media-${align}`} style={{ width: `${w}%` }}>
              {VIDEO_RE.test(media[2]) ? (
                <video src={media[2]} controls playsInline preload="metadata" aria-label={media[1] || undefined} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media[2]} alt={media[1]} loading="lazy" />
              )}
              {media[1] && <figcaption>{media[1]}</figcaption>}
            </figure>
          );
        }
        if (t === "---" || t === "***") {
          return <hr key={i} className="my-8 border-t-2 border-black/15" />;
        }
        if (t.startsWith("|") && t.includes("\n|")) {
          const lines = t.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
          if (lines.length >= 2) {
            const headerCells = lines[0].split("|").slice(1, -1).map(c => c.trim());
            // line 1 is separator | --- | --- |
            const rowLines = lines.slice(2);
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-xl border-2 border-black/30 bg-white shadow-[4px_4px_0px_#000]">
                <table className="min-w-full divide-y-2 divide-black/20 text-left font-sans text-xs sm:text-sm">
                  <thead className="bg-[#10082b] text-[#FFD24A] font-bold">
                    <tr>
                      {headerCells.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 border-r border-black/20 last:border-r-0 uppercase tracking-wider">{inline(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 bg-white text-[#1a0a3a]">
                    {rowLines.map((r, rIdx) => {
                      const cells = r.split("|").slice(1, -1).map(c => c.trim());
                      return (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-[#F9F7F1]"}>
                          {cells.map((c, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 border-r border-black/10 last:border-r-0 font-medium">{inline(c)}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }
        if (t.startsWith("## ")) {
          const headingText = t.slice(3).trim();
          const slugId = headingText.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          return <h2 key={i} id={slugId} className="scroll-mt-20">{inline(headingText)}</h2>;
        }
        if (t.startsWith("### ")) {
          const headingText = t.slice(4).trim();
          const slugId = headingText.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          return <h3 key={i} id={slugId} className="scroll-mt-20">{inline(headingText)}</h3>;
        }
        if (t.startsWith("> ")) return <blockquote key={i}>{inline(t.replace(/^> ?/gm, " ").trim())}</blockquote>;
        if (/^[-*] /.test(t))
          return (
            <ul key={i}>
              {t.split("\n").map((l, j) => (
                <li key={j}>{inline(l.replace(/^[-*] /, ""))}</li>
              ))}
            </ul>
          );
        return <p key={i}>{inline(t)}</p>;
      })}
    </div>
  );
}
