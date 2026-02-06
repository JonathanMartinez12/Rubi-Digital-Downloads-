import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy - Rubi Digital Downloads",
  description:
    "30-day money-back guarantee refund policy for Rubi Digital Downloads",
};

export default function RefundPage() {
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
            Refund Policy
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Hero Badge */}
        <div className="mb-12 rounded-2xl bg-emerald-50 border border-emerald-200 px-8 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 sm:text-3xl">
            30-Day Money-Back Guarantee
          </h2>
          <p className="mt-3 text-lg text-emerald-700">
            We want you to be completely satisfied with your purchase.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
          {/* 1. Our Guarantee */}
          <h2>1. Our Guarantee</h2>
          <p>
            We believe in the value of our products and want every customer
            to feel confident in their purchase. That is why we offer a{" "}
            <strong>full 30-day money-back guarantee</strong> on all digital
            products, no questions asked.
          </p>
          <p>
            If you are not completely satisfied with your purchase for any
            reason, simply reach out to us within 30 days of your order date
            and we will issue a full refund. We stand behind the quality of
            our workbooks, templates, and guides, and your satisfaction is our
            top priority.
          </p>

          {/* 2. How to Request a Refund */}
          <h2>2. How to Request a Refund</h2>
          <p>
            Requesting a refund is simple. Just follow these steps:
          </p>
          <ol>
            <li>
              <strong>Send us an email</strong> at{" "}
              <a
                href="mailto:support@rubidigitaldownloads.com"
                className="text-orange-600 hover:text-orange-700"
              >
                support@rubidigitaldownloads.com
              </a>{" "}
              with the subject line &quot;Refund Request.&quot;
            </li>
            <li>
              <strong>Include your order number</strong> (found in your order
              confirmation email, e.g., RBD-001).
            </li>
            <li>
              <strong>Let us know the email address</strong> associated with
              your purchase so we can locate your order quickly.
            </li>
            <li>
              <strong>Optionally, share your reason</strong> for the refund.
              While not required, your feedback helps us improve our products
              for future customers.
            </li>
          </ol>
          <p>
            Our support team typically responds to refund requests within 24
            hours during business days.
          </p>

          {/* 3. Refund Process */}
          <h2>3. Refund Process</h2>
          <p>
            Once your refund request is received and confirmed, here is what
            to expect:
          </p>
          <ul>
            <li>
              <strong>Processing time:</strong> Refunds are processed within{" "}
              <strong>5-7 business days</strong> from the date we confirm your
              request.
            </li>
            <li>
              <strong>Original payment method:</strong> The refund will be
              returned to the original payment method used at checkout (credit
              card, debit card, etc.).
            </li>
            <li>
              <strong>Confirmation email:</strong> You will receive an email
              confirmation once the refund has been processed.
            </li>
            <li>
              <strong>Bank processing:</strong> Please note that depending on
              your financial institution, it may take an additional 3-5
              business days for the refund to appear on your statement after
              we process it.
            </li>
          </ul>

          {/* 4. Exceptions */}
          <h2>4. Exceptions</h2>
          <p>
            While we strive to honor every refund request, please be aware of
            the following:
          </p>
          <ul>
            <li>
              <strong>30-day window:</strong> Refund requests must be made
              within 30 days of the original purchase date. Requests made
              after 30 days may be considered on a case-by-case basis but are
              not guaranteed.
            </li>
            <li>
              <strong>Duplicate purchases:</strong> If you accidentally
              purchased the same product twice, contact us and we will refund
              the duplicate charge regardless of the 30-day window.
            </li>
            <li>
              <strong>Abuse prevention:</strong> We reserve the right to
              limit or deny refunds if we detect a pattern of repeated
              purchases and refund requests that appears to abuse our
              guarantee policy.
            </li>
            <li>
              <strong>Bundle products:</strong> For bundled products, refunds
              apply to the entire bundle. Partial refunds for individual items
              within a bundle are not available.
            </li>
          </ul>

          {/* 5. Contact */}
          <h2>5. Contact</h2>
          <p>
            Have questions about our refund policy or need help with a refund?
            We are here for you:
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
              <strong>Response time:</strong> Within 24 hours on business days
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-slate-50 border border-slate-200 px-8 py-10 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Have questions? Contact us
          </h3>
          <p className="mt-2 text-slate-600">
            Our team is happy to help with any questions about your order or
            our refund policy.
          </p>
          <a
            href="mailto:support@rubidigitaldownloads.com"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Email Support
          </a>
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
                href="/privacy"
                className="hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
