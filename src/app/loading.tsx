export default function Loading() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    </main>
  );
}
