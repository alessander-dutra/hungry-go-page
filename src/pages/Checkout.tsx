import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCheckout } from "@/hooks/useCheckout";
import CustomerForm from "@/components/checkout/CustomerForm";
import PaymentSection from "@/components/checkout/PaymentSection";
import OrderSummary from "@/components/checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const {
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
  } = useCheckout();

  // Mock cart data (would come from cart context/state)
  const cart = location.state?.cart || {
    items: [
      { id: "1", name: "Pizza Margherita", price: 45.90, quantity: 1 },
      { id: "8", name: "Coca-Cola 2L", price: 8.50, quantity: 1 }
    ],
    subtotal: 54.40,
    deliveryFee: 5.90,
    total: 60.30
  };

  const restaurantInfo = {
    name: "Pizzaria Demo",
    deliveryTime: "30-45 min",
    phone: "(11) 99999-9999"
  };

  // Redirect if no cart
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar o pedido.",
      });
      navigate("/restaurant");
    }
  }, [cart, navigate, toast]);

  const handleNextStep = () => {
    if (validateStep(step)) {
      nextStep();
    } else {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios para continuar.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = await submitOrder(cart);
      
      toast({
        title: "Pedido realizado com sucesso! 🎉",
        description: "Redirecionando para a confirmação...",
      });

      setTimeout(() => {
        navigate("/order-confirmation", { 
          state: { orderData, cart } 
        });
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro ao processar pedido",
        description: "Tente novamente ou entre em contato com o suporte.",
        variant: "destructive"
      });
    }
  };

  const steps = [
    { number: 1, title: "Dados e Entrega", description: "Informações pessoais e endereço" },
    { number: 2, title: "Pagamento", description: "Forma de pagamento" },
    { number: 3, title: "Confirmação", description: "Revisar pedido" }
  ];

  const currentStepData = steps[step - 1];
  const progressPercentage = (step / steps.length) * 100;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
                <p className="text-muted-foreground">{restaurantInfo.name}</p>
              </div>
            </div>
            
            <Badge variant="outline" className="text-lg px-4 py-2">
              R$ {(checkoutData.deliveryOption === 'pickup' ? cart.subtotal : cart.total).toFixed(2)}
            </Badge>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex justify-between">
              {steps.map((stepItem, index) => (
                <div 
                  key={stepItem.number}
                  className={`flex items-center space-x-3 cursor-pointer ${
                    step >= stepItem.number ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => goToStep(stepItem.number)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > stepItem.number 
                      ? 'bg-primary text-primary-foreground' 
                      : step === stepItem.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > stepItem.number ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      stepItem.number
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-medium">{stepItem.title}</div>
                    <div className="text-xs text-muted-foreground">{stepItem.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{currentStepData.title}</CardTitle>
                <p className="text-muted-foreground">{currentStepData.description}</p>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <CustomerForm
                    customerData={checkoutData.customer}
                    addressData={checkoutData.address}
                    deliveryOption={checkoutData.deliveryOption || 'delivery'}
                    onCustomerChange={updateCustomer}
                    onAddressChange={updateAddress}
                    onDeliveryOptionChange={updateDeliveryOption}
                    onNotesChange={updateNotes}
                    notes={checkoutData.notes}
                  />
                )}

                {step === 2 && (
                  <PaymentSection
                    paymentData={checkoutData.payment}
                    onPaymentChange={updatePayment}
                    orderTotal={checkoutData.deliveryOption === 'pickup' ? cart.subtotal : cart.total}
                  />
                )}

                {step === 3 && (
                  <OrderSummary
                    cart={cart}
                    checkoutData={checkoutData}
                    restaurantInfo={restaurantInfo}
                  />
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>

              {step < 3 ? (
                <Button
                  variant="hero" 
                  onClick={handleNextStep}
                  disabled={!validateStep(step)}
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmitOrder}
                  disabled={loading || !validateStep(step)}
                  className="min-w-[150px]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finalizar Pedido
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <OrderSummary
                cart={cart}
                checkoutData={checkoutData}
                restaurantInfo={restaurantInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;