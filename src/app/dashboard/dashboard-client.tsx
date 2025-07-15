'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/dashboard/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { User } from '@supabase/supabase-js';

const orders = [
  { id: 'ORD001', date: '2023-10-26', status: 'Delivered', total: '₦15,000' },
  { id: 'ORD002', date: '2023-10-28', status: 'Paid', total: '₦12,500' },
  { id: 'ORD003', date: '2023-11-01', status: 'Unpaid', total: '₦12,500' },
];

const products = [
  {
    name: 'Faculty of Science Shirt',
    description: 'Crisp white shirt with embroidered FOS logo.',
    image: 'https://placehold.co/400x400.png',
    hint: 'white shirt',
    price: '₦10,000',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    name: 'Faculty of Management Sciences Shirt',
    description: 'Professional navy blue shirt for Management Sciences students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'navy blue shirt',
    price: '₦12,500',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    name: 'Faculty of Engineering Shirt',
    description: 'Durable grey shirt perfect for engineering students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'grey engineering shirt',
    price: '₦11,000',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    name: 'Faculty of Education Shirt',
    description: 'Comfortable light blue shirt for Education faculty.',
    image: 'https://placehold.co/400x400.png',
    hint: 'light blue shirt',
    price: '₦9,500',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    name: 'Faculty of Arts Shirt',
    description: 'Elegant burgundy shirt representing Arts students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'burgundy arts shirt',
    price: '₦10,500',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    name: 'Faculty of Law Shirt',
    description: 'Distinguished black shirt for Law students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'black law shirt',
    price: '₦13,000',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }
];

interface Product {
  name: string;
  description: string;
  image: string;
  hint: string;
  price: string;
  sizes: string[];
}

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  console.log('Rendering DashboardClient');
  console.log('User:', user);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <DashboardHeader user={user} />
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline">
              Welcome back, {user.user_metadata?.username || user.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Shop for your department wears and manage your orders.
            </p>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your recent purchases and order status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'Delivered'
                              ? 'default'
                              : order.status === 'Paid'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Available Products */}
          <Card>
            <CardHeader>
              <CardTitle>Available Products</CardTitle>
              <CardDescription>Browse and purchase department wears for your faculty.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <Card key={index}>
                    <CardHeader className="p-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-48 object-cover rounded-t-lg"
                        data-ai-hint={product.hint}
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {product.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold">{product.price}</span>
                        <Button onClick={() => handleBuyClick(product)}>
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
            <DialogDescription>
              Complete your order for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProduct?.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                defaultValue="1"
                min="1"
                className="col-span-3"
              />
            </div>
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup defaultValue="transfer">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="address" className="text-right pt-2">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Your delivery address"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">Place Order</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
