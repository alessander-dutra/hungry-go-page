CREATE UNIQUE INDEX IF NOT EXISTS restaurant_settings_singleton_idx
ON public.restaurant_settings ((true));

DROP POLICY IF EXISTS "Authenticated users can insert settings" ON public.restaurant_settings;
DROP POLICY IF EXISTS "Authenticated users can update settings" ON public.restaurant_settings;

CREATE POLICY "Public can insert restaurant settings"
ON public.restaurant_settings
FOR INSERT
TO public
WITH CHECK (
  id IS NOT NULL
  AND created_at IS NOT NULL
  AND updated_at IS NOT NULL
);

CREATE POLICY "Public can update restaurant settings"
ON public.restaurant_settings
FOR UPDATE
TO public
USING (id IS NOT NULL)
WITH CHECK (id IS NOT NULL);