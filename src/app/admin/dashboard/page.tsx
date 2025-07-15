"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const [successMessage, setSuccessMessage] = useState('');

  const handleProductUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productName = formData.get('productName');
    const productDetails = formData.get('productDetails');
    const productImage = formData.get('productImage');

    // Simulate product upload
    console.log({ productName, productDetails, productImage });
    setSuccessMessage('Product uploaded successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Admin Dashboard</CardTitle>
          <CardDescription>Upload new products for users to see.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProductUpload} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" name="productName" type="text" placeholder="Product Name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productDetails">Product Details</Label>
              <Textarea id="productDetails" name="productDetails" placeholder="Product Details" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productImage">Product Image URL</Label>
              <Input id="productImage" name="productImage" type="url" placeholder="https://example.com/image.jpg" required />
            </div>
            <Button type="submit" className="w-full">
              Upload Product
            </Button>
          </form>
          {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
