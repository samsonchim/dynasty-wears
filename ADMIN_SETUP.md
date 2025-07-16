# Dynasty Wears Admin Dashboard Setup

This guide will help you set up the Dynasty Wears application with admin functionality and database integration.

## Database Setup

### 1. Create Supabase Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `database/schema.sql` to create the necessary tables and functions

### 2. Database Schema Overview

The application uses two main tables:

- **products**: Stores all department wear products
- **orders**: Stores customer orders with status tracking

## Admin Functionality

### Admin Login
- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `password1234`

### Admin Dashboard Features

1. **Product Management**
   - Add new products
   - Edit existing products
   - Delete products
   - View all products

2. **Order Management**
   - View all customer orders
   - Update order status (Pending → Paid → Delivered)
   - Track order details and customer information

3. **Analytics**
   - Total revenue from completed orders
   - Order counts and statistics
   - Pending orders tracking

## User Flow

### Customer Dashboard
- Browse available products
- Place orders with size and quantity selection
- Track order status
- View order history

### Product Display
- Featured products on landing page
- Full product catalog in user dashboard
- Real-time updates from admin-managed inventory

## Technical Implementation

### Data Flow
1. Admin adds/edits products via admin dashboard
2. Products are stored in Supabase database
3. User dashboard fetches products from database
4. Orders are created and stored when users make purchases
5. Admin can view and manage all orders

### Key Features
- Real-time data synchronization
- Proper error handling
- Form validation
- Status tracking
- Price calculations

## Environment Variables

Make sure your `.env.local` file contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables

3. Run the database setup script in Supabase

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application:
   - Main site: `http://localhost:9002`
   - Admin login: `http://localhost:9002/admin/login`

## Security Notes

- Admin authentication is currently hardcoded (suitable for demo/development)
- Row Level Security (RLS) is enabled on database tables
- In production, implement proper authentication and authorization
- Consider adding role-based access control

## Database Migrations

If you need to make changes to the database schema:

1. Create a new migration file
2. Test the migration on a development environment
3. Apply to production with proper backup procedures

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure tables are created

2. **Admin Login Issues**
   - Verify credentials: admin/password1234
   - Check browser localStorage for admin session

3. **Product/Order Loading Issues**
   - Check browser console for API errors
   - Verify database tables have proper data
   - Check network requests in browser dev tools
