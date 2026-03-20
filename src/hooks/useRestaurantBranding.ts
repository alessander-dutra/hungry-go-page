import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RestaurantBranding {
  logoUrl: string | null;
  bannerUrl: string | null;
}

const initialBranding: RestaurantBranding = {
  logoUrl: null,
  bannerUrl: null,
};

export function useRestaurantBranding() {
  const [branding, setBranding] = useState<RestaurantBranding>(initialBranding);

  useEffect(() => {
    let ignore = false;

    const loadBranding = async () => {
      const { data, error } = await supabase
        .from("restaurant_settings")
        .select("logo_url, banner_url, updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (ignore) return;

      if (error) {
        console.error("Erro ao carregar identidade visual:", error);
        return;
      }

      setBranding({
        logoUrl: data?.logo_url ?? null,
        bannerUrl: data?.banner_url ?? null,
      });
    };

    loadBranding();

    return () => {
      ignore = true;
    };
  }, []);

  return branding;
}
