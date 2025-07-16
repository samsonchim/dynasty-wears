
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynastyLogo from "@/app/dynasty.png";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              Official Wears for Ebonyi State University
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl font-body">
              Look your best and represent your department with pride. We provide high-quality, comfortable, and officially approved wears for all faculties.
            </p>
          </div>
        </div>
        <Image
          src={dynastyLogo}
          alt="Dynasty Departmental Wears - Official Wears for Ebonyi State University"
          width={500}
          height={500}
          className="mx-auto rounded-xl object-contain aspect-square w-full max-w-md"
          data-ai-hint="dynasty departmental wears logo"
        />
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
