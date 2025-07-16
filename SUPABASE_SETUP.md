# Supabase Setup Instructions

## Database Setup
1. Go to your Supabase dashboard: https://eacgxwbshaeyrtxsbkat.supabase.co
2. Navigate to the SQL Editor
3. Run the SQL script from `database/schema.sql` to create all tables and sample data

## Disable Email Verification (Optional)
To disable email verification and allow users to login immediately after signup:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings** 
3. Find **User Signups** section
4. Turn OFF **"Enable email confirmations"**
5. Save the changes

This will allow users to be automatically logged in after signup without needing to verify their email.

## Database Configuration
The application uses the following tables:
- `users` - User accounts and profiles
- `products` - Department wears catalog
- `orders` - Customer orders and status tracking

## Environment Variables
Make sure your `.env` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://eacgxwbshaeyrtxsbkat.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Row Level Security (RLS)
The database includes RLS policies for security:
- Users can view all products
- Users can create and view orders
- Admin-specific operations are handled separately

## Admin Access
- Admin login: `admin@dynasty.com` / `password1234` (hardcoded)
- Admin users can manage products and view all orders
