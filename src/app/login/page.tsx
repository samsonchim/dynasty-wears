import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { login } from '@/app/auth/actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const message = searchParams?.message;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button formAction={login} type="submit" className="w-full">
                Login
              </Button>
            </form>
            {message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md">
                {message}
              </p>
            )}
          </CardContent>
          <div className="p-6 pt-0 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
