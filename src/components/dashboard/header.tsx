import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { signout } from "@/app/auth/actions";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: SupabaseUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <span className="text-xl font-semibold font-headline">Dynasty</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{user.user_metadata?.username || user.email?.split('@')[0]}</span>
        </div>
        <form action={signout}>
          <Button variant="ghost" type="submit">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </form>
      </nav>
    </header>
  );
}
