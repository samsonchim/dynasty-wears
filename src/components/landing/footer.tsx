import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Dynasty. All rights reserved.
      </p>
      <div className="sm:ml-auto flex items-center gap-4 sm:gap-6">
        <Link href="https://wa.me/2348163623743" target="_blank" className="text-xs text-muted-foreground hover:underline underline-offset-4">
            +234 816 362 3743
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#about" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            About Us
          </Link>
          <Link href="#products" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Products
          </Link>
          <Link href="/admin/login" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Admin Login
          </Link>
        </nav>
      </div>
    </footer>
  );
}
