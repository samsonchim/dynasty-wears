import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { FeaturedProducts } from '@/components/landing/products';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
