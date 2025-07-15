
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <span className="text-xl font-semibold font-headline">Dynasty</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link href="/login">
            <LogIn />
            Login
          </Link>
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/dashboard">
            <ShoppingCart />
            Shop Now
          </Link>
        </Button>
      </nav>
    </header>
  );
}
