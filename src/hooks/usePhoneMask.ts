import { useCallback } from "react";

export const usePhoneMask = () => {
  const formatPhone = useCallback((value: string): string => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    
    // Limit to 11 digits (Brazilian mobile format)
    const limitedValue = numericValue.slice(0, 11);
    
    // Apply mask based on length
    if (limitedValue.length === 0) {
      return "";
    }
    if (limitedValue.length <= 2) {
      return `(${limitedValue}`;
    }
    if (limitedValue.length <= 7) {
      return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2)}`;
    }
    return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2, 7)}-${limitedValue.slice(7)}`;
  }, []);

  const unformatPhone = useCallback((value: string): string => {
    return value.replace(/\D/g, "");
  }, []);

  return { formatPhone, unformatPhone };
};
