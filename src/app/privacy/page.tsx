import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../../components/SiteChrome";
import { Banner } from "../../components/Blocks";
import { JsonLd, breadcrumbLd, abs } from "../../lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | 90s TV Memories" },
  description: "Read the Privacy Policy for 90s TV Memories, including details on cookies, Google AdSense advertising, log files, CCPA, and GDPR compliance.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a23] text-white selection:bg-[#FF1493] selection:text-white">
      <Header />
      <main className="relative z-10 bg-gradient-to-b from-[#1a0a3a] via-[#10082b] to-[#0a0a23] pb-24">
        <JsonLd
          data={[
            breadcrumbLd([["Home", "/"], ["Privacy Policy", "/privacy"]]),
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Privacy Policy",
              url: abs("/privacy"),
              description: "Privacy policy for 90s TV Memories explaining cookies, data usage, and advertising disclosures.",
              inLanguage: "en-US",
            },
          ]}
        />
        <Banner title="Privacy Policy" />

        <article className="mx-auto max-w-4xl px-6 py-16 text-[#F5E6C8]">
          <div className="rounded-2xl border border-white/10 bg-[#140b2b]/80 p-8 sm:p-12 shadow-[0_0_25px_rgba(0,0,0,0.6)] backdrop-blur-sm space-y-8 text-base leading-relaxed">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00D9FF]">Legal & Transparency</span>
              <h1 className="mt-2 font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-wider text-[#FF1493]">
                Privacy Policy for 90s TV Memories
              </h1>
              <p className="mt-2 font-mono text-xs text-[#F5E6C8]/60">
                Last Updated: 2026 Edition | Effective Date: January 1, 2026
              </p>
            </div>

            <p>
              At <strong>90s TV Memories</strong> (accessible at <Link href="/" className="text-[#00D9FF] underline">https://www.90stvmemories.com</Link>), the privacy of our nostalgic visitors is one of our top priorities. This Privacy Policy document outlines the types of information that is collected and recorded by 90s TV Memories and how we use it.
            </p>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                1. Google AdSense & DoubleClick DART Cookies
              </h2>
              <p>
                Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve advertisements to our site visitors based upon their visit to 90stvmemories.com and other websites across the internet.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Third-party vendors, including <strong>Google</strong>, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites across the Internet.
                </li>
                <li>
                  Visitors may opt out of personalized advertising by visiting Google&apos;s Ads Settings at{" "}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#00D9FF] underline">
                    https://www.google.com/settings/ads
                  </a>{" "}
                  or through the Digital Advertising Alliance Consumer Choice tool at{" "}
                  <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#00D9FF] underline">
                    www.aboutads.info
                  </a>.
                </li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                2. Log Files
              </h2>
              <p>
                90s TV Memories follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting services do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                3. Cookies and Web Beacons
              </h2>
              <p>
                Like any other website, 90s TV Memories uses &ldquo;cookies&rdquo;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                4. Third-Party Privacy Policies
              </h2>
              <p>
                90s TV Memories&apos; Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p>
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                5. CCPA Privacy Rights (Do Not Sell My Personal Information)
              </h2>
              <p>Under the CCPA, among other rights, California consumers have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request that a business disclose the categories and specific pieces of personal data collected.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data. <strong>(Note: We do not sell personal information).</strong></li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                6. GDPR Data Protection Rights
              </h2>
              <p>We would like to make sure you are fully aware of all of your data protection rights:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification:</strong> You have the right to request that we correct any inaccurate information.</li>
                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              </ul>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                7. Children&apos;s Information (COPPA Compliance)
              </h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p>
                90s TV Memories does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </section>

            <div className="h-px w-full bg-white/10" />

            <section className="space-y-4">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl tracking-wide text-[#FFD24A]">
                8. Contact Information
              </h2>
              <p>
                If you have any questions or require more information about our Privacy Policy, do not hesitate to contact our editorial team via our{" "}
                <Link href="/contact" className="text-[#00D9FF] underline font-bold">Contact Page</Link>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
