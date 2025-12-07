import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin,
  Store,
  Rocket,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  selectedPlan?: string;
}

const planDetails: Record<string, { name: string; commission: string; features: string[] }> = {
  starter: {
    name: "Starter",
    commission: "5%",
    features: ["Site próprio de delivery", "Integração WhatsApp básica", "Até 100 pedidos/mês"],
  },
  professional: {
    name: "Professional",
    commission: "7%",
    features: ["IA integrada (chatbot avançado)", "Analytics preditivos", "Pedidos ilimitados"],
  },
  enterprise: {
    name: "Enterprise",
    commission: "8%",
    features: ["Multi-lojas", "API personalizada", "Manager dedicado"],
  },
};

const RegisterForm = ({ selectedPlan = "" }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Step 2 - Restaurant Info
    restaurantName: "",
    address: "",
    category: "",
    
    // Step 3 - Agreements
    agreeTerms: false,
    agreeMarketing: false,
    
    // Plan
    plan: selectedPlan,
  });

  const plan = planDetails[selectedPlan];

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Conta criada com sucesso! 🎉",
        description: "Bem-vindo à DeliveryPro! Redirecionando para o dashboard...",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && 
               formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      case 2:
        return formData.restaurantName && formData.address && formData.category;
      case 3:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-2">Passo 1 de 3</Badge>
              <h3 className="text-lg font-semibold">Seus dados pessoais</h3>
              <p className="text-sm text-muted-foreground">
                Vamos começar com as informações básicas
              </p>
            </div>

            {/* Selected Plan Display */}
            {plan && (
              <div className="mb-6 p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Plano selecionado:</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {plan.name} - {plan.commission}/pedido
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600">As senhas não coincidem</p>
                )}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-2">Passo 2 de 3</Badge>
              <h3 className="text-lg font-semibold">Dados do restaurante</h3>
              <p className="text-sm text-muted-foreground">
                Conte-nos sobre seu negócio
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome do restaurante</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="restaurantName"
                    type="text"
                    placeholder="Nome do seu restaurante"
                    className="pl-10"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="pizzaria">Pizzaria</option>
                  <option value="hamburgueria">Hamburgueria</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="lanchonete">Lanchonete</option>
                  <option value="sorveteria">Sorveteria</option>
                  <option value="padaria">Padaria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço completo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    id="address"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Rua, número, bairro, cidade, CEP"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-2">Passo 3 de 3</Badge>
              <h3 className="text-lg font-semibold">Quase pronto!</h3>
              <p className="text-sm text-muted-foreground">
                Últimos detalhes para criar sua conta
              </p>
            </div>

            <div className="space-y-6">
              {/* Benefits Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">O que você ganha:</h4>
                <div className="space-y-2">
                  {[
                    { icon: CheckCircle, text: "Apenas 7% de comissão (vs 25% concorrentes)" },
                    { icon: CheckCircle, text: "Site próprio do restaurante" },
                    { icon: CheckCircle, text: "IA integrada para aumentar vendas" },
                    { icon: CheckCircle, text: "WhatsApp Business nativo" },
                    { icon: CheckCircle, text: "Setup gratuito em 15 minutos" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <benefit.icon className="h-4 w-4 text-green-600" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Eu concordo com os{" "}
                    <a href="#" className="text-primary hover:underline">Termos de Uso</a>{" "}
                    e{" "}
                    <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="marketing" 
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                  />
                  <Label htmlFor="marketing" className="text-sm leading-relaxed">
                    Quero receber dicas, promoções e novidades por email (opcional)
                  </Label>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderStepContent()}

      {/* Buttons */}
      <div className="flex space-x-3">
        {step > 1 && (
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => setStep(step - 1)}
          >
            Voltar
          </Button>
        )}
        
        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          className="flex-1" 
          disabled={!validateStep() || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Criando conta...
            </>
          ) : step === 3 ? (
            <>
              <Rocket className="h-4 w-4 mr-2" />
              Criar conta
            </>
          ) : (
            "Continuar"
          )}
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Button variant="link" className="p-0 h-auto text-sm font-medium" asChild>
          <a href="/login">Fazer login</a>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;