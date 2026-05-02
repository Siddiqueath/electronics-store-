export default function ProductsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-9 w-48 skeleton rounded-xl mb-2" />
        <div className="h-4 w-64 skeleton rounded mb-8" />
        <div className="flex gap-8">
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="glass rounded-2xl p-5 h-96" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <div className="aspect-square skeleton" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-16 skeleton rounded" />
                    <div className="h-4 w-full skeleton rounded" />
                    <div className="h-3 w-24 skeleton rounded" />
                    <div className="h-5 w-20 skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
