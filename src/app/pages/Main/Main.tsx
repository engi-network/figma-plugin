import Header from '~/app/components/global/Header/Header'
import Code from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'

function Main() {
  return (
    <>
      <Header />
      <main className="flex flex-1">
        <section className="w-5/12 border-dotted border-2 border-indigo-600">
          <Preview />
        </section>
        <section className="w-2/12 border-dotted border-2 border-indigo-600">
          CTAs
        </section>
        <section className="w-5/12 border-dotted border-2 border-indigo-600">
          <Code />
        </section>
      </main>
      <footer className="border-dotted border-2 border-indigo-600">
        C section-Result
      </footer>
    </>
  )
}

export default Main
