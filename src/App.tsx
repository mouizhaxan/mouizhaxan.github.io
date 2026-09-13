import { useState } from 'react'
import { About } from './components/about/About'
import { BackToTop } from './components/BackToTop'
import { Contact } from './components/contact/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/projects/Projects'
import { useReveal } from './hooks/useReveal'

export default function App() {
  // A document or certificate modal being open holds the carousel's autoplay.
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  useReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About onModalChange={setAboutModalOpen} />
        <Projects externalModalOpen={aboutModalOpen} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
