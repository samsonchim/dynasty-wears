-- Dynasty Wears Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension (required for uuid_generate_v4())
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  hint VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  price_value INTEGER NOT NULL,
  sizes TEXT[] NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount INTEGER NOT NULL,
  payment_method VARCHAR(20) CHECK (payment_method IN ('transfer', 'cash')) NOT NULL,
  delivery_address TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Paid', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 4) AS INTEGER)), 0) + 1
  INTO next_id
  FROM orders
  WHERE order_number ~ '^ORD[0-9]+$';
  
  RETURN 'ORD' || LPAD(next_id::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number = generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (name, description, image, hint, price, price_value, sizes, category) VALUES
('Faculty of Science Shirt', 'Crisp white shirt with embroidered FOS logo.', 'https://placehold.co/400x400.png', 'white shirt', '₦10,000', 10000, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Science'),
('Faculty of Management Sciences Shirt', 'Professional navy blue shirt for Management Sciences students.', 'https://placehold.co/400x400.png', 'navy blue shirt', '₦12,500', 12500, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Management Sciences'),
('Faculty of Engineering Shirt', 'Durable grey shirt perfect for engineering students.', 'https://placehold.co/400x400.png', 'grey engineering shirt', '₦11,000', 11000, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Engineering'),
('Faculty of Education Shirt', 'Comfortable light blue shirt for Education faculty.', 'https://placehold.co/400x400.png', 'light blue shirt', '₦9,500', 9500, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Education'),
('Faculty of Arts Shirt', 'Elegant burgundy shirt representing Arts students.', 'https://placehold.co/400x400.png', 'burgundy arts shirt', '₦10,500', 10500, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Arts'),
('Faculty of Law Shirt', 'Distinguished black shirt for Law students.', 'https://placehold.co/400x400.png', 'black law shirt', '₦13,000', 13000, ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Faculty of Law');

-- Insert sample orders (optional - for testing)
INSERT INTO orders (user_id, user_email, product_id, product_name, size, quantity, total_amount, payment_method, delivery_address, status, created_at, updated_at) VALUES
('user-1', 'john@example.com', (SELECT id FROM products WHERE name = 'Faculty of Science Shirt'), 'Faculty of Science Shirt', 'M', 1, 10000, 'transfer', '123 Student Hostel, University Campus', 'Delivered', '2023-10-26T10:30:00Z', '2023-10-28T14:20:00Z'),
('user-2', 'jane@example.com', (SELECT id FROM products WHERE name = 'Faculty of Management Sciences Shirt'), 'Faculty of Management Sciences Shirt', 'L', 1, 12500, 'cash', '456 Student Hostel, University Campus', 'Paid', '2023-10-28T09:15:00Z', '2023-10-28T09:15:00Z'),
('user-3', 'mike@example.com', (SELECT id FROM products WHERE name = 'Faculty of Engineering Shirt'), 'Faculty of Engineering Shirt', 'XL', 1, 11000, 'transfer', '789 Student Hostel, University Campus', 'Pending', '2023-11-01T16:45:00Z', '2023-11-01T16:45:00Z');

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (allow read for everyone, write for admin only)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- RLS Policies for orders (allow read for everyone, write for authenticated users)
CREATE POLICY "Orders are viewable by everyone" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders can be updated" ON orders
  FOR UPDATE USING (true);

-- Note: In a production environment, you would want more restrictive policies
-- For example, users should only see their own orders, and only admins should be able to update order status
