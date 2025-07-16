"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import { 
  getAllProducts, 
  getAllOrders, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  updateOrderStatus,
  formatPrice,
  parsePrice,
  type Product, 
  type Order 
} from '@/lib/data';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Check admin authentication
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          getAllProducts(),
          getAllOrders()
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Please refresh the page.');
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  const handleProductSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const productData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      hint: formData.get('hint') as string,
      price: formData.get('price') as string,
      priceValue: parsePrice(formData.get('price') as string),
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()),
      category: formData.get('category') as string,
    };

    try {
      if (isEditMode && selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct.id, productData);
        if (updatedProduct) {
          setProducts(await getAllProducts());
          setSuccessMessage('Product updated successfully!');
        }
      } else {
        await addProduct(productData);
        setProducts(await getAllProducts());
        setSuccessMessage('Product added successfully!');
      }
      
      setIsProductDialogOpen(false);
      setSelectedProduct(null);
      setIsEditMode(false);
      setError('');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsProductDialogOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const success = await deleteProduct(productId);
      if (success) {
        setProducts(await getAllProducts());
        setSuccessMessage('Product deleted successfully!');
      } else {
        setError('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setIsProductDialogOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      if (updatedOrder) {
        setOrders(await getAllOrders());
        setSuccessMessage(`Order ${updatedOrder.orderNumber} status updated to ${status}!`);
      } else {
        setError('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status.');
    }
  };

  const closeDialog = () => {
    setIsProductDialogOpen(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  // Statistics
  const totalRevenue = orders
    .filter(order => order.status === 'Paid' || order.status === 'Delivered')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const pendingOrdersCount = orders.filter(order => order.status === 'Pending').length;
  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Dynasty Wears Admin</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto space-y-8">
          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage products, orders, and view analytics for Dynasty Wears.
            </p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  From completed orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  All time orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrdersCount}</div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Active products
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="orders">Orders Management</TabsTrigger>
              <TabsTrigger value="products">Products Management</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Orders Management</CardTitle>
                  <CardDescription>View and manage all customer orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.userEmail}</TableCell>
                          <TableCell>{order.productName}</TableCell>
                          <TableCell>{order.size}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                          <TableCell className="capitalize">{order.paymentMethod}</TableCell>
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
                          <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value: Order['status']) => 
                                handleUpdateOrderStatus(order.id, value)
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Products Management</CardTitle>
                    <CardDescription>Add, edit, and manage department wear products.</CardDescription>
                  </div>
                  <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sizes</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.sizes.join(', ')}</TableCell>
                          <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                          <TableCell className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Product Add/Edit Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Update the product details below.' : 'Enter the details for the new product.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Faculty of Science Shirt" 
                defaultValue={selectedProduct?.name || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category" 
                type="text" 
                placeholder="Faculty of Science" 
                defaultValue={selectedProduct?.category || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Crisp white shirt with embroidered logo..." 
                defaultValue={selectedProduct?.description || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (include ₦ symbol)</Label>
              <Input 
                id="price" 
                name="price" 
                type="text" 
                placeholder="₦10,000" 
                defaultValue={selectedProduct?.price || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sizes">Available Sizes (comma-separated)</Label>
              <Input 
                id="sizes" 
                name="sizes" 
                type="text" 
                placeholder="XS, S, M, L, XL, XXL" 
                defaultValue={selectedProduct?.sizes.join(', ') || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                type="url" 
                placeholder="https://example.com/image.jpg" 
                defaultValue={selectedProduct?.image || ''}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hint">AI Hint (for image generation)</Label>
              <Input 
                id="hint" 
                name="hint" 
                type="text" 
                placeholder="white shirt" 
                defaultValue={selectedProduct?.hint || ''}
                required 
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
