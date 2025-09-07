export default function ServerNotice() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-3 rounded-lg shadow-md text-sm">
      ⚡ First request may take 30–60s because the server is waking up...
    </div>
  );
}
