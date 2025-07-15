// Shared data structures for products and orders

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  hint: string;
  price: string;
  priceValue: number; // numeric value for calculations
  sizes: string[];
  category: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: 'transfer' | 'cash';
  deliveryAddress: string;
  status: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (in a real app, this would be a database)
let products: Product[] = [
  {
    id: 'prod-001',
    name: 'Faculty of Science Shirt',
    description: 'Crisp white shirt with embroidered FOS logo.',
    image: 'https://placehold.co/400x400.png',
    hint: 'white shirt',
    price: '₦10,000',
    priceValue: 10000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Science',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-002',
    name: 'Faculty of Management Sciences Shirt',
    description: 'Professional navy blue shirt for Management Sciences students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'navy blue shirt',
    price: '₦12,500',
    priceValue: 12500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Management Sciences',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-003',
    name: 'Faculty of Engineering Shirt',
    description: 'Durable grey shirt perfect for engineering students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'grey engineering shirt',
    price: '₦11,000',
    priceValue: 11000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Engineering',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-004',
    name: 'Faculty of Education Shirt',
    description: 'Comfortable light blue shirt for Education faculty.',
    image: 'https://placehold.co/400x400.png',
    hint: 'light blue shirt',
    price: '₦9,500',
    priceValue: 9500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Education',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-005',
    name: 'Faculty of Arts Shirt',
    description: 'Elegant burgundy shirt representing Arts students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'burgundy arts shirt',
    price: '₦10,500',
    priceValue: 10500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Arts',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-006',
    name: 'Faculty of Law Shirt',
    description: 'Distinguished black shirt for Law students.',
    image: 'https://placehold.co/400x400.png',
    hint: 'black law shirt',
    price: '₦13,000',
    priceValue: 13000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Faculty of Law',
    createdAt: new Date().toISOString(),
  },
];

let orders: Order[] = [
  {
    id: 'ORD001',
    userId: 'user-1',
    userEmail: 'john@example.com',
    productId: 'prod-001',
    productName: 'Faculty of Science Shirt',
    size: 'M',
    quantity: 1,
    totalAmount: 10000,
    paymentMethod: 'transfer',
    deliveryAddress: '123 Student Hostel, University Campus',
    status: 'Delivered',
    createdAt: '2023-10-26T10:30:00Z',
    updatedAt: '2023-10-28T14:20:00Z',
  },
  {
    id: 'ORD002',
    userId: 'user-2',
    userEmail: 'jane@example.com',
    productId: 'prod-002',
    productName: 'Faculty of Management Sciences Shirt',
    size: 'L',
    quantity: 1,
    totalAmount: 12500,
    paymentMethod: 'cash',
    deliveryAddress: '456 Student Hostel, University Campus',
    status: 'Paid',
    createdAt: '2023-10-28T09:15:00Z',
    updatedAt: '2023-10-28T09:15:00Z',
  },
  {
    id: 'ORD003',
    userId: 'user-3',
    userEmail: 'mike@example.com',
    productId: 'prod-003',
    productName: 'Faculty of Engineering Shirt',
    size: 'XL',
    quantity: 1,
    totalAmount: 11000,
    paymentMethod: 'transfer',
    deliveryAddress: '789 Student Hostel, University Campus',
    status: 'Pending',
    createdAt: '2023-11-01T16:45:00Z',
    updatedAt: '2023-11-01T16:45:00Z',
  },
];

// Product management functions
export const getAllProducts = (): Product[] => {
  return [...products];
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, productData: Partial<Product>): Product | null => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...productData };
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return false;
  
  products.splice(index, 1);
  return true;
};

// Order management functions
export const getAllOrders = (): Order[] => {
  return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByUser = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const newOrder: Order = {
    ...orderData,
    id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order['status']): Order | null => {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return null;
  
  orders[index] = { 
    ...orders[index], 
    status, 
    updatedAt: new Date().toISOString() 
  };
  return orders[index];
};

// Utility functions
export const formatPrice = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[₦,]/g, ''));
};

export const generateOrderId = (): string => {
  return `ORD${String(orders.length + 1).padStart(3, '0')}`;
};
