-- Restrict restaurant_settings writes to authenticated users
DROP POLICY IF EXISTS "Public can insert restaurant settings" ON public.restaurant_settings;
DROP POLICY IF EXISTS "Public can update restaurant settings" ON public.restaurant_settings;

CREATE POLICY "Authenticated can insert restaurant settings"
ON public.restaurant_settings
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update restaurant settings"
ON public.restaurant_settings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Restrict restaurant-assets bucket writes to authenticated users
DROP POLICY IF EXISTS "Anyone can upload restaurant assets" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update restaurant assets" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete restaurant assets" ON storage.objects;

-- Tighten public SELECT to anon only-listing remains, but bucket is public for reads.
-- Keep the existing authenticated read/write policies already present.
