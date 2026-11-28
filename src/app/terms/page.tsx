import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../../components/SiteChrome";
import { Banner } from "../../components/Blocks";
import { JsonLd, breadcrumbLd, abs } from "../../lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | 90s TV Memories" },
  description: "Read the Terms of Service for 90s TV Memories covering site usage, intellectual property, commentary guidelines, and disclaimers.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a23] text-white selection:bg-[#FF1493] selection:text-white">
      <Header />
      <main className="relative z-10 bg-gradient-to-b from-[#1a0a3a] via-[#10082b] to-[#0a0a23] pb-24">
        <JsonLd
          data={[
            breadcrumbLd([["Home", "/"], ["Terms of Service", "/terms"]]),
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms of Service",
              url: abs("/terms"),
              inLanguage: "en-US",
            },
          ]}
        />
        <Banner title="Terms of Service" />

        <article className="mx-auto max-w-4xl px-6 py-16 text-[#F5E6C8]">
          <div className="rounded-2xl border border-white/10 bg-[#140b2b]/80 p-8 sm:p-12 shadow-[0_0_25px_rgba(0,0,0,0.6)] backdrop-blur-sm space-y-8 text-base leading-relaxed">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00D9FF]">Rules & Agreements</span>
              <h1 className="mt-2 font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-wider text-[#FF1493]">
                Terms of Service
              </h1>
              <p className="mt-2 font-mono text-xs text-[#F5E6C8]/60">
                Last Updated: 2026 Edition | Effective Date: January 1, 2026
              </p>
            </div>

            <p>
              Welcome to <strong>90s TV Memories</strong>! By accessing or using our website located at{" "}
              <Link href="/" className="text-[#00D9FF] underline">https://www.90stvmemories.com</Link>, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the website.
            </p>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                1. Content Purpose & Nostalgia Fan Archive
              </h2>
              <p>
                90s TV Memories is an independent, nostalgia-driven digital publication and fan archive dedicated to celebrating the culture, sitcoms, cartoons, and television memories of the 1990s. All articles, commentary, retrospectives, and reviews published on this website are provided strictly for entertainment, educational, and historical research purposes.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                2. Intellectual Property & Fair Use
              </h2>
              <p>
                Original written articles, graphic layouts, editorial commentary, and design elements created by 90s TV Memories are protected by intellectual property laws.
              </p>
              <p>
                All television show names, character names, logos, stills, promotional photos, and brand references belong exclusively to their respective copyright and trademark owners (including Warner Bros., NBCUniversal, Paramount, The Walt Disney Company, Fox, Sony Pictures, and their affiliates). These assets are referenced under the <strong>Fair Use</strong> provisions of United States Copyright Law (17 U.S.C. § 107) for transformative purposes of critique, historical commentary, news reporting, and nostalgic discussion.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                3. Advertisements & Third-Party Links
              </h2>
              <p>
                Our website may display advertisements served by third-party advertising partners, such as <strong>Google AdSense</strong>, and may contain links to third-party websites or services (e.g. streaming platforms or social media fan groups) that are not owned or controlled by 90s TV Memories.
              </p>
              <p>
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or ad networks. You acknowledge and agree that 90s TV Memories shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content or services.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                4. User Conduct
              </h2>
              <p>
                When submitting messages through our contact forms or engaging with our community, you agree not to submit unlawful, threatening, abusive, defamatory, or vulgar material, or transmit any viruses, malware, or destructive code.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                5. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, 90s TV Memories and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                6. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. Material changes will be indicated by updating the &ldquo;Last Updated&rdquo; date at the top of this page.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                7. Questions & Contact
              </h2>
              <p>
                If you have questions regarding these Terms of Service, please reach out via our{" "}
                <Link href="/contact" className="text-[#00D9FF] underline font-bold">Contact Us</Link> page.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
