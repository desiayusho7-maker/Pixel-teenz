import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Work from './components/Work';
import Founder from './components/Founder';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="min-h-screen font-body text-slate-100 relative">
      <div className="bg-scene" aria-hidden="true">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Pricing />
          <Work />
          <Founder />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </div>
  );
}
