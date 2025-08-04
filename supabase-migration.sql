-- Migration script for Supabase PostgreSQL
-- This script creates the tables needed for the resend-clerk application

-- Create users table with new Supabase schema
CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY, -- This is the clerk_user_id
    email TEXT NOT NULL,
    full_name TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
    last_used TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
    subscription_product_id CHARACTER VARYING(50) NULL,
    subscription_expires_at TIMESTAMP WITH TIME ZONE NULL,
    subscription_auto_renew BOOLEAN NULL DEFAULT FALSE,
    last_receipt_data TEXT NULL,
    out_from_marketing TIMESTAMP WITH TIME ZONE NULL,
    out_from_update TIMESTAMP WITH TIME ZONE NULL,
    account_deleted TIMESTAMP WITH TIME ZONE NULL
);

-- Create campaign-details table (unchanged)
CREATE TABLE IF NOT EXISTS "campaign-details" (
    id SERIAL PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    audience_name VARCHAR(255) NOT NULL,
    subject_line TEXT NOT NULL,
    recipients_count INTEGER NOT NULL,
    when_sent TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_campaign_details_when_sent ON "campaign-details"(when_sent);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Stores user information from Clerk authentication';
COMMENT ON TABLE "campaign-details" IS 'Stores email campaign details and history';
COMMENT ON COLUMN users.id IS 'Unique identifier from Clerk authentication service (clerk_user_id)';
COMMENT ON COLUMN users.full_name IS 'Full name of the user';
COMMENT ON COLUMN users.subscription_product_id IS 'Product ID for user subscription';
COMMENT ON COLUMN users.subscription_expires_at IS 'When the subscription expires';
COMMENT ON COLUMN users.subscription_auto_renew IS 'Whether subscription auto-renews';
COMMENT ON COLUMN users.out_from_marketing IS 'Timestamp when user unsubscribed from marketing emails';
COMMENT ON COLUMN users.out_from_update IS 'Timestamp when user unsubscribed from update emails';
COMMENT ON COLUMN users.account_deleted IS 'Timestamp when user account was deleted'; 