import type { Metadata } from "next";
import Link from "next/link";

import LegalPage, { LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name}'s portfolio site handles your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 15, 2026">
      <p className="mt-6 text-soft">
        This is the portfolio site of {site.name}, operated by Mokahub LLC (&ldquo;Mokahub&rdquo;, &ldquo;I&rdquo;, &ldquo;me&rdquo;). It collects very little. This page explains what, why, and
        who else touches it.
      </p>

      <LegalSection title="What I collect">
        <ul>
          <li>
            <strong>Contact form:</strong> the name, email address and message you type in. I use them only to read
            and reply to you.
          </li>
          <li>
            <strong>Captcha:</strong> the form uses Cloudflare Turnstile to block bots. Cloudflare receives technical
            signals from your browser (such as your IP address) to decide whether you are human, under{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
              Cloudflare&apos;s privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Server logs:</strong> the hosting provider may log standard request data (IP address, browser,
            pages requested) for security and reliability.
          </li>
          <li>
            <strong>Theme preference:</strong> your light/dark choice is saved in your browser&apos;s local storage. It
            never leaves your device.
          </li>
        </ul>
        <p>There are no advertising or analytics trackers on this site.</p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Visitors get no tracking cookies. Cookies are set only for the sign-in session of the site owner&apos;s admin
          area. The Cloudflare Turnstile captcha on the contact form may also use functional storage to work. All of this
          is strictly functional, so no consent banner is shown.
        </p>
      </LegalSection>

      <LegalSection title="Who processes data">
        <ul>
          <li>Cloudflare: hosting and the Turnstile captcha.</li>
          <li>Resend: delivers your contact message to my inbox by email.</li>
          <li>Supabase: stores project content and the admin sign-in. Contact form messages are not stored there.</li>
        </ul>
        <p>Mokahub LLC does not sell your data or share it for marketing.</p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Contact messages stay in my email inbox for as long as needed to handle your request, and I delete them when
          they are no longer useful. Server logs are kept by the hosting provider for its standard period.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You can ask what I hold about you, and request a correction or deletion, at any time. Depending on where you
          live (for example the EU/UK under GDPR, or California under CCPA) you may have further rights, including
          complaining to your local data protection authority. Use the{" "}
          <Link href="/#contact">contact form</Link> to make a request.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>This site is not directed at children under 13, and I do not knowingly collect their data.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          If this policy changes, the date above is updated. See also the <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
