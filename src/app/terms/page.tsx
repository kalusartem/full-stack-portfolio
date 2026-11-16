import type { Metadata } from "next";
import Link from "next/link";

import LegalPage, { LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${site.name}'s portfolio site.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="November 15, 2026">
      <p className="mt-6 text-soft">
        This site is operated by Mokahub LLC (&ldquo;Mokahub&rdquo;, &ldquo;I&rdquo;, &ldquo;me&rdquo;) and showcases the work of {site.name}. By using it you agree to these terms. If you do not agree, please do not use it.
      </p>

      <LegalSection title="Content and ownership">
        <p>
          The text, design and code samples on this site belong to Mokahub LLC or {site.name} unless noted otherwise. Project names,
          logos and screenshots belong to their respective owners and are shown to describe my work. You may link to the
          site freely. Please do not copy or republish its content without permission.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>send spam, malware or unlawful, abusive or misleading messages through the contact form;</li>
          <li>probe, scan or attack the site, or try to bypass its security, captcha or rate limits;</li>
          <li>access the admin area or any data that is not meant for you.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Contact and no engagement">
        <p>
          Sending a message does not create a client relationship, confidentiality duty or any agreement. Any work
          would be agreed separately in writing.
        </p>
      </LegalSection>

      <LegalSection title="External links and demos">
        <p>
          The site links to third-party sites and live demos I do not control. I am not responsible for their content
          or practices, and demos are provided for illustration only.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer and liability">
        <p>
          The site is provided &quot;as is&quot; without warranties of any kind, and I do not guarantee it will always be
          available or error-free. To the fullest extent allowed by law, I am not liable for any loss arising from your
          use of the site.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          I may update these terms; the date above shows the latest version. Questions? Use the{" "}
          <Link href="/#contact">contact form</Link>. Your data is handled as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
