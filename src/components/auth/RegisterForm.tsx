import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
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
  CheckCircle,
  AlertCircle
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

// Validation schemas for each step
const step1Schema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: z.string()
    .email("E-mail inválido")
    .max(255, "E-mail deve ter no máximo 255 caracteres"),
  phone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone deve ter no máximo 15 dígitos")
    .regex(/^[\d\s()+-]+$/, "Telefone deve conter apenas números e caracteres válidos"),
  password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const step2Schema = z.object({
  restaurantName: z.string()
    .min(2, "Nome do restaurante deve ter pelo menos 2 caracteres")
    .max(100, "Nome do restaurante deve ter no máximo 100 caracteres"),
  category: z.string()
    .min(1, "Selecione uma categoria"),
  address: z.string()
    .min(10, "Endereço deve ter pelo menos 10 caracteres")
    .max(300, "Endereço deve ter no máximo 300 caracteres"),
});

const step3Schema = z.object({
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
  }),
});

type FieldErrors = Record<string, string>;

const RegisterForm = ({ selectedPlan = "" }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    address: "",
    category: "",
    agreeTerms: false,
    agreeMarketing: false,
    plan: selectedPlan,
  });

  const plan = planDetails[selectedPlan];
  const { toast } = useToast();

  const validateField = (field: string, value: string | boolean) => {
    try {
      if (step === 1) {
        if (field === "confirmPassword" || field === "password") {
          const result = step1Schema.safeParse({
            ...formData,
            [field]: value,
          });
          if (!result.success) {
            const fieldError = result.error.errors.find(e => e.path.includes(field));
            if (fieldError) {
              setErrors(prev => ({ ...prev, [field]: fieldError.message }));
              return;
            }
          }
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            if (field === "password") delete newErrors["confirmPassword"];
            return newErrors;
          });
        } else {
          const fieldSchemas: Record<string, z.ZodType> = {
            name: step1Schema.innerType().shape.name,
            email: step1Schema.innerType().shape.email,
            phone: step1Schema.innerType().shape.phone,
          };
          if (fieldSchemas[field]) {
            fieldSchemas[field].parse(value);
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[field];
              return newErrors;
            });
          }
        }
      } else if (step === 2) {
        const fieldSchemas: Record<string, z.ZodType> = {
          restaurantName: step2Schema.shape.restaurantName,
          category: step2Schema.shape.category,
          address: step2Schema.shape.address,
        };
        if (fieldSchemas[field]) {
          fieldSchemas[field].parse(value);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const validateStep = (): boolean => {
    let result: z.SafeParseReturnType<any, any>;

    switch (step) {
      case 1:
        result = step1Schema.safeParse({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        break;
      case 2:
        result = step2Schema.safeParse({
          restaurantName: formData.restaurantName,
          category: formData.category,
          address: formData.address,
        });
        break;
      case 3:
        result = step3Schema.safeParse({
          agreeTerms: formData.agreeTerms,
        });
        break;
      default:
        return false;
    }
    
    if (!result.success) {
      const newErrors: FieldErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        newErrors[field] = error.message;
      });
      setErrors(newErrors);
      
      // Mark all fields as touched based on step
      const stepFields: Record<number, string[]> = {
        1: ["name", "email", "phone", "password", "confirmPassword"],
        2: ["restaurantName", "category", "address"],
        3: ["agreeTerms"],
      };
      const touchedFields: Record<string, boolean> = {};
      (stepFields[step] || []).forEach(key => {
        touchedFields[key] = true;
      });
      setTouched(prev => ({ ...prev, ...touchedFields }));
      
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setErrors({});
      setStep(step + 1);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Conta criada com sucesso! 🎉",
        description: "Bem-vindo à DeliveryPro! Redirecionando para o dashboard...",
      });
      
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
    
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const renderFieldError = (field: string) => {
    if (errors[field] && touched[field]) {
      return (
        <p className="text-sm text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3" />
          {errors[field]}
        </p>
      );
    }
    return null;
  };

  const getInputClassName = (field: string) => {
    const baseClass = "pl-10";
    if (errors[field] && touched[field]) {
      return `${baseClass} border-destructive focus-visible:ring-destructive`;
    }
    return baseClass;
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return step1Schema.safeParse({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }).success;
      case 2:
        return step2Schema.safeParse({
          restaurantName: formData.restaurantName,
          category: formData.category,
          address: formData.address,
        }).success;
      case 3:
        return step3Schema.safeParse({
          agreeTerms: formData.agreeTerms,
        }).success;
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
                    className={getInputClassName("name")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                  />
                </div>
                {renderFieldError("name")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className={getInputClassName("email")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                </div>
                {renderFieldError("email")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className={getInputClassName("phone")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                  />
                </div>
                {renderFieldError("phone")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    className={`${getInputClassName("password")} pr-10`}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {renderFieldError("password")}
                {!errors["password"] && formData.password && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className={formData.password.length >= 6 ? "text-green-600" : ""}>
                      {formData.password.length >= 6 ? "✓" : "○"} Mínimo 6 caracteres
                    </p>
                    <p className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                      {/[A-Z]/.test(formData.password) ? "✓" : "○"} Uma letra maiúscula
                    </p>
                    <p className={/[0-9]/.test(formData.password) ? "text-green-600" : ""}>
                      {/[0-9]/.test(formData.password) ? "✓" : "○"} Um número
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    className={`${getInputClassName("confirmPassword")} pr-10`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {renderFieldError("confirmPassword")}
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
                    className={getInputClassName("restaurantName")}
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                    onBlur={() => handleBlur("restaurantName")}
                  />
                </div>
                {renderFieldError("restaurantName")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select 
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    errors["category"] && touched["category"] 
                      ? "border-destructive focus-visible:ring-destructive" 
                      : "border-input"
                  }`}
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  onBlur={() => handleBlur("category")}
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
                {renderFieldError("category")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço completo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    id="address"
                    className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      errors["address"] && touched["address"] 
                        ? "border-destructive focus-visible:ring-destructive" 
                        : "border-input"
                    }`}
                    placeholder="Rua, número, bairro, cidade, CEP"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                  />
                </div>
                {renderFieldError("address")}
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => {
                        handleInputChange("agreeTerms", checked as boolean);
                        setTouched(prev => ({ ...prev, agreeTerms: true }));
                      }}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Eu concordo com os{" "}
                      <a href="#" className="text-primary hover:underline">Termos de Uso</a>{" "}
                      e{" "}
                      <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                    </Label>
                  </div>
                  {renderFieldError("agreeTerms")}
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

      <div className="flex space-x-3">
        {step > 1 && (
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => {
              setErrors({});
              setStep(step - 1);
            }}
          >
            Voltar
          </Button>
        )}
        
        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          className="flex-1" 
          disabled={!isStepValid() || loading}
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