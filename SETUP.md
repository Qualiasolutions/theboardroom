# Boardroom Setup Guide

## Quick Setup Instructions

### 1. Database Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Execute the script (this creates all tables, policies, and storage buckets)

### 2. Environment Configuration
The `.env.local` file is already configured with the correct credentials:
- Project: `yppqtoovofcwoyzkhndu`
- Database URL and keys are set

### 3. Enable Realtime (Optional - for live collaboration)
1. In Supabase Dashboard, go to Database → Replication
2. Enable realtime for these tables:
   - `board_items` (for live board updates)
   - `comments` (for real-time comments)
   - `posts` (for live discussions)

### 4. Create Users
Since this is invitation-only:
1. Go to Authentication → Users in Supabase Dashboard
2. Click "Invite User" or "Add User"
3. Create users with email addresses
4. Users will receive email invitations to set passwords

### 5. Test Setup
1. Run `npm install` and `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Member Sign In"
4. Login with a created user account
5. You should be redirected to the dashboard

## Architecture Notes

- **Multi-tenant**: Organizations isolate data between different founder groups
- **Real-time**: Live collaboration on boards and discussions
- **Security**: Row Level Security (RLS) ensures users only see their org data
- **Type Safety**: Full TypeScript integration with database types
- **Production Ready**: Scalable architecture with proper authentication

## Troubleshooting

- **Can't login**: Check if user exists in Supabase Auth dashboard
- **No data visible**: Check RLS policies and user organization membership
- **Build errors**: Verify all environment variables are set correctly
- **Real-time not working**: Enable realtime replication in Supabase dashboard