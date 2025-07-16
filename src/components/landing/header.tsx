
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
        <Link href="/login">
          <Button variant="ghost" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shop Now
          </Button>
        </Link>
        {/* Admin link - discrete */}
        <Link 
          href="/admin/login" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}
