'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";

const products = [
  {
    name: "Faculty of Science Shirt",
    description: "Crisp white shirt with embroidered FOS logo. Made with breathable cotton.",
    image: "https://placehold.co/400x400.png",
    hint: "white shirt"
  },
  {
    name: "Faculty of Engineering Shirt",
    description: "Durable sky-blue shirt, tailored for a sharp look. Wrinkle-resistant fabric.",
    image: "https://placehold.co/400x400.png",
    hint: "blue shirt"
  },
  {
    name: "Faculty of Arts Shirt",
    description: "Classic cream-colored shirt for a professional appearance. Soft and comfortable.",
    image: "https://placehold.co/400x400.png",
    hint: "cream shirt"
  },
  {
    name: "Faculty of Law Shirt",
    description: "Elegant black shirt with a subtle faculty emblem. Premium blend for all-day comfort.",
    image: "https://placehold.co/400x400.png",
    hint: "black shirt"
  }
];

export function FeaturedProducts() {
  const isMobile = useIsMobile();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Products</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed font-body">
            Explore our collection of high-quality departmental wears.
          </p>
        </div>
        <Carousel
          plugins={isMobile ? [plugin.current] : []}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </div>
    </section>
  );
}
