import { useState, useCallback } from 'react';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

export interface AddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentData {
  method: 'pix' | 'credit' | 'debit' | 'cash';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  changeFor?: number;
}

export interface CheckoutData {
  customer: CustomerData;
  address: AddressData;
  payment: PaymentData;
  notes?: string;
  deliveryOption: 'delivery' | 'pickup';
}

export const useCheckout = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({
    deliveryOption: 'delivery'
  });

  const updateCustomer = useCallback((customer: CustomerData) => {
    setCheckoutData(prev => ({ ...prev, customer }));
  }, []);

  const updateAddress = useCallback((address: AddressData) => {
    setCheckoutData(prev => ({ ...prev, address }));
  }, []);

  const updatePayment = useCallback((payment: PaymentData) => {
    setCheckoutData(prev => ({ ...prev, payment }));
  }, []);

  const updateDeliveryOption = useCallback((deliveryOption: 'delivery' | 'pickup') => {
    setCheckoutData(prev => ({ ...prev, deliveryOption }));
  }, []);

  const updateNotes = useCallback((notes: string) => {
    setCheckoutData(prev => ({ ...prev, notes }));
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => Math.min(prev + 1, 3));
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((stepNumber: number) => {
    setStep(stepNumber);
  }, []);

  const submitOrder = useCallback(async (cartData: any) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the order to your backend
      const orderData = {
        ...checkoutData,
        cart: cartData,
        timestamp: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`
      };
      
      console.log('Order submitted:', orderData);
      
      return orderData;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [checkoutData]);

  const validateStep = useCallback((stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return !!(
          checkoutData.customer?.name &&
          checkoutData.customer?.email &&
          checkoutData.customer?.phone &&
          checkoutData.address?.street &&
          checkoutData.address?.number &&
          checkoutData.address?.neighborhood &&
          checkoutData.address?.city &&
          checkoutData.address?.zipCode
        );
      case 2:
        return !!(
          checkoutData.payment?.method &&
          (checkoutData.payment.method === 'pix' || 
           checkoutData.payment.method === 'cash' ||
           (checkoutData.payment.cardNumber && 
            checkoutData.payment.cardName && 
            checkoutData.payment.cardExpiry && 
            checkoutData.payment.cardCvv))
        );
      case 3:
        return true; // Review step is always valid
      default:
        return false;
    }
  }, [checkoutData]);

  return {
    step,
    loading,
    checkoutData,
    updateCustomer,
    updateAddress,
    updatePayment,
    updateDeliveryOption,
    updateNotes,
    nextStep,
    prevStep,
    goToStep,
    submitOrder,
    validateStep
  };
};