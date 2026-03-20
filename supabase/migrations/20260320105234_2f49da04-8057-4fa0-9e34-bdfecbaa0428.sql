
CREATE POLICY "Anyone can read restaurant assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'restaurant-assets');

CREATE POLICY "Anyone can upload restaurant assets"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'restaurant-assets');

CREATE POLICY "Anyone can update restaurant assets"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'restaurant-assets');

CREATE POLICY "Anyone can delete restaurant assets"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'restaurant-assets');
