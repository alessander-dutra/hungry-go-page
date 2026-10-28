DROP POLICY IF EXISTS "Authenticated users can delete restaurant assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update restaurant assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload restaurant assets" ON storage.objects;
CREATE POLICY "Admins can upload restaurant assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'restaurant-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update restaurant assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'restaurant-assets' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'restaurant-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete restaurant assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'restaurant-assets' AND public.has_role(auth.uid(), 'admin'));