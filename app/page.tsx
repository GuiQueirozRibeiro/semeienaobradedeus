import HeroSection from '../src/features/hero'
import VisionSection from '../src/features/vision'
import OutreachSection from '../src/features/outreach'
import ProgressSection from '../src/features/progress'
import GallerySection from '../src/features/gallery'
import DonateSection from '../src/features/donate'
import Footer from '../src/features/footer'

export default function Home() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <OutreachSection />
      <ProgressSection />
      <GallerySection />
      <DonateSection />
      <Footer />
    </>
  )
}
