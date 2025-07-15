
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { signup } from '@/app/auth/actions';

export default function SignupPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
            <CardDescription>Create an account to start shopping.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button formAction={signup} type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md">
                {searchParams.message}
              </p>
            )}
          </CardContent>
          <div className="p-6 pt-0 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
