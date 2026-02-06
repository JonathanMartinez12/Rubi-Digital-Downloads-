import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Rubi Digital Downloads",
  description: "Privacy policy for Rubi Digital Downloads",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
          <p>
            At Rubi Digital Downloads, your privacy is important to us. This
            Privacy Policy explains how we collect, use, store, and protect
            your personal information when you visit our website and purchase
            our products. By using our services, you consent to the practices
            described in this policy.
          </p>

          {/* 1. Information We Collect */}
          <h2>1. Information We Collect</h2>
          <p>
            We collect the following types of information to provide and
            improve our services:
          </p>
          <h3>Personal Information</h3>
          <ul>
            <li>
              <strong>Name:</strong> Collected when you create an account or
              make a purchase.
            </li>
            <li>
              <strong>Email address:</strong> Used for account creation, order
              confirmations, download delivery, and communication.
            </li>
            <li>
              <strong>Payment information:</strong> Credit card and billing
              details are collected and processed securely through Stripe. We
              do not store your full payment card information on our servers.
            </li>
          </ul>
          <h3>Usage Data</h3>
          <ul>
            <li>
              Browser type and version, device information, and operating
              system.
            </li>
            <li>Pages visited, time spent on pages, and navigation paths.</li>
            <li>IP address and approximate geographic location.</li>
            <li>Referring website or source that led you to our site.</li>
          </ul>

          {/* 2. How We Use Your Information */}
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul>
            <li>
              <strong>Order processing:</strong> To process your purchases,
              verify payment, and generate order confirmations.
            </li>
            <li>
              <strong>Download delivery:</strong> To provide you with access
              to your purchased digital products via email and your account
              dashboard.
            </li>
            <li>
              <strong>Account management:</strong> To create and maintain your
              user account, manage your purchase history, and provide
              customer support.
            </li>
            <li>
              <strong>Communication:</strong> To send transactional emails
              (order confirmations, download links, password resets) and, with
              your consent, promotional updates about new products and offers.
            </li>
            <li>
              <strong>Service improvement:</strong> To analyze usage patterns
              and improve our website, products, and user experience.
            </li>
          </ul>

          {/* 3. Payment Processing */}
          <h2>3. Payment Processing</h2>
          <p>
            All payment transactions are processed through{" "}
            <strong>Stripe</strong>, a PCI-compliant payment processor. When
            you make a purchase:
          </p>
          <ul>
            <li>
              Your payment card information is transmitted directly to Stripe
              using secure, encrypted connections.
            </li>
            <li>
              We <strong>never store</strong> your full credit card number,
              CVV, or other sensitive payment details on our servers.
            </li>
            <li>
              We retain only a transaction reference ID and the last four
              digits of your card for order identification purposes.
            </li>
            <li>
              Stripe&apos;s privacy policy and security practices govern the
              handling of your payment data. You can review Stripe&apos;s
              privacy policy at{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700"
              >
                stripe.com/privacy
              </a>
              .
            </li>
          </ul>

          {/* 4. Data Storage */}
          <h2>4. Data Storage</h2>
          <p>
            Your account data and purchase information are stored securely
            using <strong>Firebase</strong> (Google Cloud Platform). Our data
            storage practices include:
          </p>
          <ul>
            <li>
              Account information (name, email, purchase history) is stored
              in Firebase Firestore with appropriate security rules.
            </li>
            <li>
              Authentication is managed through Firebase Authentication with
              industry-standard security protocols.
            </li>
            <li>
              All data is stored on secure servers with encryption at rest
              and in transit.
            </li>
            <li>
              We retain your data for as long as your account is active or as
              needed to provide you with our services and comply with legal
              obligations.
            </li>
          </ul>

          {/* 5. Cookies */}
          <h2>5. Cookies</h2>
          <p>
            We use a minimal number of cookies to ensure a smooth experience
            on our website:
          </p>
          <ul>
            <li>
              <strong>Session cookies:</strong> Essential cookies that keep
              you logged in and maintain your session as you navigate the
              site.
            </li>
            <li>
              <strong>Preference cookies:</strong> Store your display
              preferences such as theme settings.
            </li>
            <li>
              <strong>Cart cookies:</strong> Remember items in your shopping
              cart between visits.
            </li>
          </ul>
          <p>
            We do not use third-party advertising cookies or tracking cookies
            for ad targeting purposes. You can manage cookie preferences
            through your browser settings, though disabling essential cookies
            may affect site functionality.
          </p>

          {/* 6. Third-Party Services */}
          <h2>6. Third-Party Services</h2>
          <p>
            We use the following trusted third-party services to operate our
            platform. Each service has its own privacy policy governing data
            use:
          </p>
          <ul>
            <li>
              <strong>Stripe</strong> - Payment processing and tax
              calculation. Handles all financial transactions securely.
            </li>
            <li>
              <strong>Firebase (Google)</strong> - User authentication, data
              storage, and account management.
            </li>
            <li>
              <strong>Resend</strong> - Transactional email delivery for order
              confirmations, download links, and account notifications.
            </li>
            <li>
              <strong>Vercel</strong> - Website hosting and deployment. Serves
              our website content and handles traffic routing.
            </li>
          </ul>
          <p>
            We only share the minimum necessary data with these providers to
            deliver our services to you.
          </p>

          {/* 7. Your Rights */}
          <h2>7. Your Rights</h2>
          <p>
            You have the following rights regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You can request a copy of the personal
              data we hold about you at any time.
            </li>
            <li>
              <strong>Correction:</strong> You can update or correct your
              personal information through your account settings or by
              contacting us.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your
              account and associated personal data. Please note that we may
              need to retain certain information for legal or accounting
              purposes.
            </li>
            <li>
              <strong>Export:</strong> You can request a machine-readable
              export of your personal data.
            </li>
            <li>
              <strong>Opt-out:</strong> You can unsubscribe from promotional
              communications at any time using the unsubscribe link in our
              emails.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:support@rubidigitaldownloads.com"
              className="text-orange-600 hover:text-orange-700"
            >
              support@rubidigitaldownloads.com
            </a>
            . We will respond to your request within 30 days.
          </p>

          {/* 8. Data Security */}
          <h2>8. Data Security</h2>
          <p>
            We take the security of your personal information seriously and
            implement appropriate measures to protect it:
          </p>
          <ul>
            <li>
              <strong>Encryption:</strong> All data transmitted between your
              browser and our servers is encrypted using TLS/SSL (HTTPS).
            </li>
            <li>
              <strong>Secure connections:</strong> Our website is served
              exclusively over HTTPS, ensuring all communications are
              encrypted.
            </li>
            <li>
              <strong>Access controls:</strong> Access to personal data is
              restricted to authorized personnel only and protected by strong
              authentication mechanisms.
            </li>
            <li>
              <strong>Regular monitoring:</strong> We regularly review our
              security practices and update them as needed to address new
              threats.
            </li>
          </ul>
          <p>
            While we strive to protect your information, no method of
            transmission over the Internet or electronic storage is 100%
            secure. We cannot guarantee absolute security but are committed to
            safeguarding your data to the best of our ability.
          </p>

          {/* 9. Children's Privacy */}
          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Rubi Digital Downloads is not directed at children under the age
            of 13. We do not knowingly collect personal information from
            children under 13. If we become aware that a child under 13 has
            provided us with personal information, we will take steps to
            delete that information promptly.
          </p>
          <p>
            If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us at{" "}
            <a
              href="mailto:support@rubidigitaldownloads.com"
              className="text-orange-600 hover:text-orange-700"
            >
              support@rubidigitaldownloads.com
            </a>{" "}
            so we can take appropriate action.
          </p>

          {/* 10. Changes */}
          <h2>10. Changes to This Policy</h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at
            any time. When we make changes, we will update the &quot;Last
            updated&quot; date at the top of this page. For significant
            changes, we may also notify you via email or a prominent notice on
            our website.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to
            stay informed about how we protect your information. Your
            continued use of our services after any changes constitutes your
            acceptance of the updated policy.
          </p>

          {/* 11. Contact */}
          <h2>11. Contact</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@rubidigitaldownloads.com"
                className="text-orange-600 hover:text-orange-700"
              >
                support@rubidigitaldownloads.com
              </a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <Link href="/" className="text-orange-600 hover:text-orange-700">
                rubidigitaldownloads.com
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer nav */}
        <div className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </Link>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link
                href="/terms"
                className="hover:text-slate-900 transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/refund"
                className="hover:text-slate-900 transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
