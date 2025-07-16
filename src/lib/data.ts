// Database integration for products and orders using Supabase
import { createClient } from '../../utils/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  hint: string;
  price: string;
  priceValue: number; // maps to price_value in DB
  sizes: string[];
  category: string;
  createdAt: string; // maps to created_at in DB
}

export interface Order {
  id: string;
  orderNumber: string; // maps to order_number in DB
  userId: string; // maps to user_id in DB
  userEmail: string; // maps to user_email in DB
  productId: string; // maps to product_id in DB
  productName: string; // maps to product_name in DB
  size: string;
  quantity: number;
  totalAmount: number; // maps to total_amount in DB
  paymentMethod: 'transfer' | 'cash'; // maps to payment_method in DB
  deliveryAddress: string; // maps to delivery_address in DB
  status: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
  createdAt: string; // maps to created_at in DB
  updatedAt: string; // maps to updated_at in DB
}

// Database row interfaces (matching the actual DB schema)
interface ProductRow {
  id: string;
  name: string;
  description: string;
  image: string;
  hint: string;
  price: string;
  price_value: number;
  sizes: string[];
  category: string;
  created_at: string;
  updated_at?: string;
}

interface OrderRow {
  id: string;
  order_number: string;
  user_id: string;
  user_email: string;
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  total_amount: number;
  payment_method: 'transfer' | 'cash';
  delivery_address: string;
  status: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
  created_at: string;
  updated_at: string;
}

// Helper functions to convert between DB rows and interface objects
const mapProductFromDB = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  description: row.description,
  image: row.image,
  hint: row.hint,
  price: row.price,
  priceValue: row.price_value,
  sizes: row.sizes,
  category: row.category,
  createdAt: row.created_at,
});

const mapProductToDB = (product: Omit<Product, 'id' | 'createdAt'>): Omit<ProductRow, 'id' | 'created_at' | 'updated_at'> => ({
  name: product.name,
  description: product.description,
  image: product.image,
  hint: product.hint,
  price: product.price,
  price_value: product.priceValue,
  sizes: product.sizes,
  category: product.category,
});

const mapOrderFromDB = (row: OrderRow): Order => ({
  id: row.id,
  orderNumber: row.order_number,
  userId: row.user_id,
  userEmail: row.user_email,
  productId: row.product_id,
  productName: row.product_name,
  size: row.size,
  quantity: row.quantity,
  totalAmount: row.total_amount,
  paymentMethod: row.payment_method,
  deliveryAddress: row.delivery_address,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapOrderToDB = (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Omit<OrderRow, 'id' | 'order_number' | 'created_at' | 'updated_at'> => ({
  user_id: order.userId,
  user_email: order.userEmail,
  product_id: order.productId,
  product_name: order.productName,
  size: order.size,
  quantity: order.quantity,
  total_amount: order.totalAmount,
  payment_method: order.paymentMethod,
  delivery_address: order.deliveryAddress,
  status: order.status,
});

// Client-side only check
const isClient = typeof window !== 'undefined';

// Product management functions
export const getAllProducts = async (): Promise<Product[]> => {
  if (!isClient) {
    // Return empty array during SSR to avoid hydration issues
    return [];
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data?.map(mapProductFromDB) || [];
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (!isClient) {
    return null;
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data ? mapProductFromDB(data) : null;
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
};

export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  const supabase = createClient();
  
  const dbData = mapProductToDB(productData);
  
  const { data, error } = await supabase
    .from('products')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product');
  }

  return mapProductFromDB(data);
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  const supabase = createClient();
  
  // Convert the partial product data to DB format
  const dbData: Partial<ProductRow> = {};
  
  if (productData.name !== undefined) dbData.name = productData.name;
  if (productData.description !== undefined) dbData.description = productData.description;
  if (productData.image !== undefined) dbData.image = productData.image;
  if (productData.hint !== undefined) dbData.hint = productData.hint;
  if (productData.price !== undefined) dbData.price = productData.price;
  if (productData.priceValue !== undefined) dbData.price_value = productData.priceValue;
  if (productData.sizes !== undefined) dbData.sizes = productData.sizes;
  if (productData.category !== undefined) dbData.category = productData.category;

  const { data, error } = await supabase
    .from('products')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data ? mapProductFromDB(data) : null;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
};

// Order management functions
export const getAllOrders = async (): Promise<Order[]> => {
  if (!isClient) {
    return [];
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data?.map(mapOrderFromDB) || [];
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    return [];
  }
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  if (!isClient) {
    return null;
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data ? mapOrderFromDB(data) : null;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    return null;
  }
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  if (!isClient) {
    return [];
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }

    return data?.map(mapOrderFromDB) || [];
  } catch (error) {
    console.error('Error in getOrdersByUser:', error);
    return [];
  }
};

export const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  const supabase = createClient();
  
  const dbData = mapOrderToDB(orderData);
  
  const { data, error } = await supabase
    .from('orders')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Error adding order:', error);
    throw new Error('Failed to add order');
  }

  return mapOrderFromDB(data);
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }

  return data ? mapOrderFromDB(data) : null;
};

// Utility functions
export const formatPrice = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[₦,]/g, ''));
};

// Legacy function for backward compatibility
export const generateOrderId = (): string => {
  return `ORD${String(Date.now()).slice(-3)}`;
};
