import PhotoList from "@/components/PhotoList";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Photo library
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Photos
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Browse the collection and sort photos by title.
          </p>
        </header>
        <PhotoList />
      </div>
    </main>
  );
}

export default App;
