-- schema.sql
-- Run this in your Supabase SQL Editor to create the necessary table and setup Row Level Security (RLS) policies.

-- Create the portfolio table
create table if not exists public.portfolio (
  id text primary key default 'default',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.portfolio enable row level security;

-- Drop existing policies if they exist to prevent conflicts on re-runs
drop policy if exists "Allow public read access" on public.portfolio;
drop policy if exists "Allow public insert access" on public.portfolio;
drop policy if exists "Allow public update access" on public.portfolio;

-- Create policy to allow public read access
create policy "Allow public read access" 
  on public.portfolio 
  for select 
  using (true);

-- Create policy to allow public inserts (needed for migration/setup)
create policy "Allow public insert access" 
  on public.portfolio 
  for insert 
  with check (true);

-- Create policy to allow public updates (needed for saving via admin panel)
create policy "Allow public update access" 
  on public.portfolio 
  for update 
  using (true);

-- Create storage bucket for portfolio images
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Drop existing storage policies if they exist
drop policy if exists "Public Read portfolio-images" on storage.objects;
drop policy if exists "Public Insert portfolio-images" on storage.objects;
drop policy if exists "Public Update portfolio-images" on storage.objects;
drop policy if exists "Public Delete portfolio-images" on storage.objects;

-- Allow public access to read files from the portfolio-images bucket
create policy "Public Read portfolio-images"
  on storage.objects for select
  using ( bucket_id = 'portfolio-images' );

-- Allow public uploads to the portfolio-images bucket
create policy "Public Insert portfolio-images"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio-images' );

-- Allow public updates to the portfolio-images bucket
create policy "Public Update portfolio-images"
  on storage.objects for update
  using ( bucket_id = 'portfolio-images' );

-- Allow public deletions from the portfolio-images bucket
create policy "Public Delete portfolio-images"
  on storage.objects for delete
  using ( bucket_id = 'portfolio-images' );


