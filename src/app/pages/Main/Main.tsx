import Header from '~/app/components/global/Header/Header'

function Main() {
  return (
    <>
      <Header />
      <main className="flex flex-1">
        <section className="w-5/12 border-dotted border-2 border-indigo-600">
          A section-preview
        </section>
        <section className="w-2/12 border-dotted border-2 border-indigo-600">
          CTAs
        </section>
        <section className="w-5/12 border-dotted border-2 border-indigo-600">
          B section-code
        </section>
      </main>
      <footer className="border-dotted border-2 border-indigo-600">
        C section-Result
      </footer>
    </>
  )
}

export default Main
