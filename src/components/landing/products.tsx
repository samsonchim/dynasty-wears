'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAllProducts, type Product } from "@/lib/data";

// Fallback products to prevent hydration issues
const fallbackProducts: Product[] = [
  {
    id: "fallback-1",
    name: "Faculty of Science Shirt",
    description: "Crisp white shirt with embroidered FOS logo.",
    image: "https://placehold.co/400x400.png",
    hint: "white shirt",
    price: "₦10,000",
    priceValue: 10000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: "Faculty of Science",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    name: "Faculty of Engineering Shirt",
    description: "Durable grey shirt perfect for engineering students.",
    image: "https://placehold.co/400x400.png",
    hint: "grey engineering shirt",
    price: "₦11,000",
    priceValue: 11000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: "Faculty of Engineering",
    createdAt: new Date().toISOString(),
  }
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const loadProducts = async () => {
      try {
        const productsData = await getAllProducts();
        if (productsData.length > 0) {
          setProducts(productsData.slice(0, 4)); // Show only first 4 for featured products
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Keep fallback products
      }
    };

    loadProducts();
  }, [mounted]);

  // Prevent SSR/hydration mismatch
  if (!mounted) {
    return (
      <section id="products" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed font-body">
              Loading products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Products</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed font-body">
            Explore our collection of high-quality departmental wears.
          </p>
        </div>
        {products.length > 0 && (
          <Carousel
            plugins={isMobile ? [plugin.current] : []}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={250}
                          height={250}
                          className="rounded-lg aspect-square object-cover border"
                          data-ai-hint={product.hint}
                        />
                        <CardDescription className="text-center font-body">{product.description}</CardDescription>
                        <div className="text-lg font-bold text-primary">{product.price}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex"/>
          </Carousel>
        )}
      </div>
    </section>
  );
}
