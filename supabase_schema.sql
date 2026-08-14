-- PulseServe CRM & Gym Operating System PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor (https://app.supabase.com -> SQL Editor)

-- 1. Create Multi-Tenant SaaS Directory Table
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Gym & Fitness',
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  branch_count INTEGER NOT NULL DEFAULT 1,
  plan_tier TEXT NOT NULL DEFAULT 'Enterprise SaaS',
  status TEXT NOT NULL DEFAULT 'Active',
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 1490.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Gym Members Directory Table
CREATE TABLE IF NOT EXISTS public.gym_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'Standard Access',
  status TEXT NOT NULL DEFAULT 'Active',
  check_in_time TEXT NOT NULL,
  scan_method TEXT NOT NULL DEFAULT 'QR Camera',
  visits_this_month INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create At-Risk Retention CRM Table
CREATE TABLE IF NOT EXISTS public.at_risk_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  days_inactive INTEGER NOT NULL,
  phone TEXT NOT NULL,
  last_visit TEXT NOT NULL,
  plan_expiry DATE NOT NULL,
  reengagement_status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.at_risk_members ENABLE ROW LEVEL SECURITY;

-- 5. Create Permissive Policies for Development
CREATE POLICY "Allow public read access to tenants" ON public.tenants FOR SELECT USING (true);
CREATE POLICY "Allow public insert to tenants" ON public.tenants FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to tenants" ON public.tenants FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to gym_members" ON public.gym_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert to gym_members" ON public.gym_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to gym_members" ON public.gym_members FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to at_risk_members" ON public.at_risk_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert to at_risk_members" ON public.at_risk_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to at_risk_members" ON public.at_risk_members FOR UPDATE USING (true);
