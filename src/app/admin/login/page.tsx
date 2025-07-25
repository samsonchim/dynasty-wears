'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get('username');
      const password = formData.get('password');

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === 'admin' && password === 'password1234') {
        // Set admin session
        localStorage.setItem('adminLoggedIn', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" placeholder="......" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="......" required />
            </div>
            <Button type="submit" className="w-full" loading={isLoading}>
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
