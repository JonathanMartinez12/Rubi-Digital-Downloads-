import Link from "next/link";
import { FileQuestion, ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
          <FileQuestion className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
