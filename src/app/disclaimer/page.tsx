import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../../components/SiteChrome";
import { Banner } from "../../components/Blocks";
import { JsonLd, breadcrumbLd, abs } from "../../lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Disclaimer & Fair Use Notice | 90s TV Memories" },
  description: "Read the official Disclaimer and Fair Use statement for 90s TV Memories, an independent 1990s television nostalgia and retrospective website.",
  alternates: { canonical: "/disclaimer" },
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#0a0a23] text-white selection:bg-[#FF1493] selection:text-white">
      <Header />
      <main className="relative z-10 bg-gradient-to-b from-[#1a0a3a] via-[#10082b] to-[#0a0a23] pb-24">
        <JsonLd
          data={[
            breadcrumbLd([["Home", "/"], ["Disclaimer", "/disclaimer"]]),
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Disclaimer",
              url: abs("/disclaimer"),
              inLanguage: "en-US",
            },
          ]}
        />
        <Banner title="Disclaimer & Fair Use" />

        <article className="mx-auto max-w-4xl px-6 py-16 text-[#F5E6C8]">
          <div className="rounded-2xl border border-white/10 bg-[#140b2b]/80 p-8 sm:p-12 shadow-[0_0_25px_rgba(0,0,0,0.6)] backdrop-blur-sm space-y-8 text-base leading-relaxed">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00D9FF]">Non-Affiliation Notice</span>
              <h1 className="mt-2 font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-wider text-[#FF1493]">
                Disclaimer & Fair Use Statement
              </h1>
              <p className="mt-2 font-mono text-xs text-[#F5E6C8]/60">
                Last Updated: 2026 Edition | Effective Date: January 1, 2026
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                1. Independent Fan Website Notice
              </h2>
              <p>
                <strong>90s TV Memories</strong> (<Link href="/" className="text-[#00D9FF] underline">www.90stvmemories.com</Link>) is an independent, non-commercial entertainment and cultural retrospective website created by fans, for fans.
              </p>
              <p>
                We are <strong>NOT</strong> affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with the American Broadcasting Company (ABC), National Broadcasting Company (NBC), CBS Broadcasting Inc., Fox Broadcasting Company, Warner Bros. Discovery, The Walt Disney Company, Paramount Global, Sony Pictures Entertainment, or any of their subsidiaries or affiliates.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                2. Trademarks & Copyright Ownership
              </h2>
              <p>
                The official names of television shows (including but not limited to <em>Full House, Friends, Seinfeld, The Fresh Prince of Bel-Air, Saved by the Bell, Boy Meets World, Family Matters, Beverly Hills 90210</em>, etc.), character names, logos, slogans, and related media elements are registered trademarks (®) or trademarks (™) of their respective copyright and trademark holders.
              </p>
              <p>
                The use of any trade name or trademark on this site is strictly for identification, historical reference, and commentary purposes only and does not imply any association with the trademark holder.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                3. Copyright Disclaimer Under Section 107 (Fair Use)
              </h2>
              <p>
                This website may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in our efforts to advance historical understanding, preservation, and appreciation of 1990s television broadcast culture.
              </p>
              <div className="rounded-xl border border-[#FF1493]/30 bg-[#FF1493]/10 p-5 text-sm">
                <p className="font-mono font-bold text-[#FF1493] mb-1">U.S. Copyright Act of 1976 (17 U.S. Code § 107):</p>
                <p>
                  &ldquo;The fair use of a copyrighted work... for purposes such as criticism, comment, news reporting, teaching, scholarship, or research, is not an infringement of copyright.&rdquo;
                </p>
              </div>
              <p>
                All episode stills, cast photos, and retro screenshots featured on this site are used under Fair Use for transformative editorial purposes, including biographical cast updates, retrospective critique, and nostalgic analysis.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                4. Accuracy & Information Disclaimer
              </h2>
              <p>
                The information provided on 90s TV Memories is published in good faith and for general informational and entertainment purposes only. While we strive to verify biographical details, net worth estimations, and broadcast trivia, we make no representations or warranties of any kind regarding completeness, reliability, or accuracy.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                5. Advertising Disclaimer
              </h2>
              <p>
                This website may display advertisements served through <strong>Google AdSense</strong>. Third-party advertising vendors use cookies to serve ads based on your visits to this and other websites. 90s TV Memories does not directly endorse or guarantee the products or services advertised by third-party ad networks.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                6. Contact for Copyright or Removal Inquiries
              </h2>
              <p>
                If you are a copyright owner or an agent thereof and believe that any content hosted on our site infringes upon your copyrights, please contact us with details via our{" "}
                <Link href="/contact" className="text-[#00D9FF] underline font-bold">Contact Us</Link> page, and we will promptly address and remove any verified infringing content.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
