
-- Create storage bucket for restaurant assets (public so images are accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurant-assets', 'restaurant-assets', true);

-- Create restaurant_settings table to persist logo and banner URLs
CREATE TABLE public.restaurant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  banner_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings (public restaurant page needs this)
CREATE POLICY "Anyone can read restaurant settings"
  ON public.restaurant_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert/update settings
CREATE POLICY "Authenticated users can insert settings"
  ON public.restaurant_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON public.restaurant_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage policies: allow authenticated users to upload/update/delete
CREATE POLICY "Authenticated users can upload restaurant assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'restaurant-assets');

CREATE POLICY "Anyone can view restaurant assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'restaurant-assets');

CREATE POLICY "Authenticated users can update restaurant assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'restaurant-assets')
  WITH CHECK (bucket_id = 'restaurant-assets');

CREATE POLICY "Authenticated users can delete restaurant assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'restaurant-assets');
