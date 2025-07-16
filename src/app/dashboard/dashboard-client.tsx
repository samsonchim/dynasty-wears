'use client';

import React, { useState, useEffect } from 'react';
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
import { 
  getAllProducts, 
  getOrdersByUser, 
  addOrder, 
  formatPrice,
  type Product, 
  type Order 
} from '@/lib/data';

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  console.log('Rendering DashboardClient');
  console.log('User:', user);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    size: '',
    quantity: 1,
    paymentMethod: 'transfer' as 'transfer' | 'cash',
    address: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          getAllProducts(),
          getOrdersByUser('user-current') // In a real app, use actual user.id
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setSuccessMessage('');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    setOrderForm({
      size: '',
      quantity: 1,
      paymentMethod: 'transfer',
      address: ''
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedProduct) return;

    const orderData = {
      userId: 'user-current', // In a real app, use user.id
      userEmail: user.email || 'guest@example.com',
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      size: orderForm.size,
      quantity: orderForm.quantity,
      totalAmount: selectedProduct.priceValue * orderForm.quantity,
      paymentMethod: orderForm.paymentMethod,
      deliveryAddress: orderForm.address,
      status: 'Pending' as const,
    };

    try {
      const newOrder = await addOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      setSuccessMessage('Order placed successfully! Check your orders below.');
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to place order:', error);
      setSuccessMessage('Failed to place order. Please try again.');
    }
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

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your recent purchases and order status.</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell>{order.size}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Delivered'
                                ? 'default'
                                : order.status === 'Paid'
                                ? 'secondary'
                                : order.status === 'Pending'
                                ? 'outline'
                                : 'destructive'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(order.totalAmount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No orders yet. Start shopping to see your orders here!
                </p>
              )}
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
                {products.map((product) => (
                  <Card key={product.id}>
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
                      <CardDescription className="mt-2 mb-3">
                        {product.description}
                      </CardDescription>
                      <div className="text-sm text-muted-foreground mb-4">
                        Category: {product.category}
                      </div>
                      <div className="flex items-center justify-between">
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
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Select 
                value={orderForm.size} 
                onValueChange={(value) => handleFormChange('size', value)}
                required
              >
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
                value={orderForm.quantity}
                onChange={(e) => handleFormChange('quantity', parseInt(e.target.value))}
                min="1"
                className="col-span-3"
                required
              />
            </div>
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup 
                value={orderForm.paymentMethod} 
                onValueChange={(value: 'transfer' | 'cash') => handleFormChange('paymentMethod', value)}
              >
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
                value={orderForm.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            {selectedProduct && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total:</Label>
                <div className="col-span-3 text-lg font-bold">
                  {formatPrice(selectedProduct.priceValue * orderForm.quantity)}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={!orderForm.size || !orderForm.address}>
                Place Order
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
