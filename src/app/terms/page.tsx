import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Rubi Digital Downloads",
  description: "Terms and conditions for Rubi Digital Downloads",
};

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
          {/* 1. Overview */}
          <h2>1. Overview</h2>
          <p>
            These terms govern your use of Rubi Digital Downloads and the
            products available on our platform. By accessing or using our
            website and purchasing any digital products, you agree to be bound
            by these Terms &amp; Conditions. If you do not agree with any part
            of these terms, please do not use our services.
          </p>
          <p>
            Rubi Digital Downloads is operated by James Villarrubia. Throughout
            these terms, &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;
            refer to Rubi Digital Downloads and its owner.
          </p>

          {/* 2. Digital Products */}
          <h2>2. Digital Products</h2>
          <p>
            All products sold through Rubi Digital Downloads are digital goods
            delivered electronically. Please note the following:
          </p>
          <ul>
            <li>
              <strong>No physical shipping:</strong> Our products are digital
              downloads only. No physical items will be mailed or shipped to
              you.
            </li>
            <li>
              <strong>Instant delivery:</strong> Upon successful payment, you
              will receive immediate access to download your purchased
              products. A download link will be provided on the confirmation
              page and sent to your email address.
            </li>
            <li>
              <strong>File formats:</strong> Products are delivered in the
              formats specified on each product page (PDF, Excel, Word, etc.).
              Please ensure you have the appropriate software to open and use
              the files before purchasing.
            </li>
            <li>
              <strong>Download availability:</strong> Download links remain
              active and accessible through your account. We recommend
              downloading and saving your files promptly after purchase.
            </li>
          </ul>

          {/* 3. License & Usage */}
          <h2>3. License &amp; Usage</h2>
          <p>
            When you purchase a product from Rubi Digital Downloads, you are
            granted a limited, non-exclusive, non-transferable license to use
            the product subject to the following terms:
          </p>
          <h3>Permitted Uses</h3>
          <ul>
            <li>
              <strong>Personal use:</strong> You may use the purchased products
              for your own personal, non-commercial purposes.
            </li>
            <li>
              <strong>Printing:</strong> You are welcome to print the
              materials for your personal use, including filling out
              workbooks, templates, and checklists.
            </li>
            <li>
              <strong>Device storage:</strong> You may store copies on your
              personal devices for your own reference and use.
            </li>
          </ul>
          <h3>Prohibited Uses</h3>
          <ul>
            <li>
              <strong>No redistribution:</strong> You may not share, resell,
              distribute, or give away any purchased products to others,
              whether for free or for a fee.
            </li>
            <li>
              <strong>No modification for resale:</strong> You may not alter,
              rebrand, or modify the products and sell them as your own.
            </li>
            <li>
              <strong>No commercial use:</strong> Products may not be used for
              commercial purposes, including coaching programs or group
              trainings, without prior written consent.
            </li>
          </ul>

          {/* 4. Payments */}
          <h2>4. Payments</h2>
          <p>
            All payments are processed securely through Stripe, a trusted
            third-party payment processor. By making a purchase, you agree to
            the following:
          </p>
          <ul>
            <li>
              All prices are listed in <strong>US Dollars (USD)</strong>.
            </li>
            <li>
              Applicable taxes are calculated and handled by Stripe at
              checkout based on your location.
            </li>
            <li>
              We accept major credit cards, debit cards, and other payment
              methods supported by Stripe.
            </li>
            <li>
              Your payment information is processed directly by Stripe. We
              never store your credit card details on our servers.
            </li>
            <li>
              You are responsible for ensuring that your payment information
              is accurate and that you have sufficient funds to complete your
              purchase.
            </li>
          </ul>

          {/* 5. Refund Policy */}
          <h2>5. Refund Policy</h2>
          <p>
            We stand behind the quality of our products and offer a{" "}
            <strong>30-day money-back guarantee</strong> on all purchases.
          </p>
          <ul>
            <li>
              If you are not satisfied with your purchase for any reason, you
              may request a full refund within 30 days of the original
              purchase date.
            </li>
            <li>
              To request a refund, contact us at{" "}
              <a
                href="mailto:support@rubidigitaldownloads.com"
                className="text-orange-600 hover:text-orange-700"
              >
                support@rubidigitaldownloads.com
              </a>{" "}
              with your order number and the reason for your refund request.
            </li>
            <li>
              Refunds are processed within 5-7 business days and returned to
              your original payment method.
            </li>
            <li>
              For more details, please visit our{" "}
              <Link href="/refund" className="text-orange-600 hover:text-orange-700">
                Refund Policy
              </Link>{" "}
              page.
            </li>
          </ul>

          {/* 6. Intellectual Property */}
          <h2>6. Intellectual Property</h2>
          <p>
            All content available through Rubi Digital Downloads, including
            but not limited to workbooks, templates, guides, checklists,
            designs, text, graphics, logos, and digital files, is the
            intellectual property of Rubi Digital Downloads and James
            Villarrubia.
          </p>
          <p>
            This content is protected by copyright laws and international
            intellectual property agreements. Unauthorized reproduction,
            distribution, or use of any materials is strictly prohibited and
            may result in legal action.
          </p>

          {/* 7. Account */}
          <h2>7. Account</h2>
          <p>
            When you create an account on Rubi Digital Downloads, you are
            responsible for:
          </p>
          <ul>
            <li>
              Maintaining the confidentiality of your account credentials,
              including your password.
            </li>
            <li>
              All activities that occur under your account, whether or not you
              authorized them.
            </li>
            <li>
              Notifying us immediately if you suspect any unauthorized use of
              your account.
            </li>
            <li>
              Providing accurate and up-to-date information when creating and
              maintaining your account.
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms or engage in fraudulent activity.
          </p>

          {/* 8. Limitation of Liability */}
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Rubi Digital
            Downloads and its owner, James Villarrubia, shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, including but not limited to loss of profits, data, use,
            or goodwill, arising out of or in connection with your use of our
            products or services.
          </p>
          <p>
            Our products are provided for informational and educational
            purposes only. They do not constitute financial, legal, or
            professional advice. You are solely responsible for any decisions
            made based on the information provided in our products. Our total
            liability to you for any claims arising from your use of our
            services shall not exceed the amount you paid for the specific
            product in question.
          </p>

          {/* 9. Changes to Terms */}
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify or update these Terms &amp;
            Conditions at any time without prior notice. Changes will be
            effective immediately upon posting to this page. The &quot;Last
            updated&quot; date at the top of this page reflects the most
            recent revision.
          </p>
          <p>
            Your continued use of Rubi Digital Downloads after any changes to
            these terms constitutes your acceptance of the revised terms. We
            encourage you to review this page periodically to stay informed of
            any updates.
          </p>

          {/* 10. Contact */}
          <h2>10. Contact</h2>
          <p>
            If you have any questions, concerns, or requests regarding these
            Terms &amp; Conditions, please do not hesitate to contact us:
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
                href="/privacy"
                className="hover:text-slate-900 transition-colors"
              >
                Privacy Policy
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
