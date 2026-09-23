-- ==========================================
-- WAKAJES SUPABASE DATABASE & STORAGE SETUP
-- ==========================================

-- 1. Create Submissions Table with Proof of Payment
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paper_ref TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  authors TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  manuscript_url TEXT NOT NULL,
  payment_receipt_url TEXT,
  payment_status TEXT DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Verified', 'Rejected')),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Minor Revision', 'Major Revision', 'Accepted', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Submissions Table
-- Allow anyone to insert new submissions (Public)
CREATE POLICY "Public insert submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow admins/public to read submissions
CREATE POLICY "Public read submissions" 
ON public.submissions 
FOR SELECT 
USING (true);

-- Allow updates (status changes)
CREATE POLICY "Allow update submissions" 
ON public.submissions 
FOR UPDATE 
USING (true);

-- 4. Create Storage Buckets for Manuscripts & Payment Receipts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('manuscripts', 'manuscripts', true),
       ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Upload Manuscripts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id IN ('manuscripts', 'receipts'));

CREATE POLICY "Public Read Manuscripts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN ('manuscripts', 'receipts'));
