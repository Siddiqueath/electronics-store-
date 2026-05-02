export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-3 w-16 skeleton rounded" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square skeleton rounded-2xl mb-4" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => <div key={i} className="w-20 h-20 skeleton rounded-xl" />)}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-5 w-24 skeleton rounded" />
            <div className="h-8 w-3/4 skeleton rounded" />
            <div className="h-4 w-32 skeleton rounded" />
            <div className="h-12 w-48 skeleton rounded" />
            <div className="h-4 w-24 skeleton rounded" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-10 w-20 skeleton rounded-xl" />)}
            </div>
            <div className="flex gap-3 mt-6">
              <div className="h-14 w-32 skeleton rounded-xl" />
              <div className="h-14 flex-1 skeleton rounded-xl" />
              <div className="h-14 w-14 skeleton rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
