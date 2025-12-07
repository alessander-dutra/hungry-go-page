import { useSearchParams } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const planInfo: Record<string, { name: string; description: string }> = {
  starter: { name: "Starter", description: "Perfeito para começar - 5% por pedido" },
  professional: { name: "Professional", description: "Para restaurantes em crescimento - 7% por pedido" },
  enterprise: { name: "Enterprise", description: "Para redes e grandes volumes - 8% por pedido" },
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan")?.toLowerCase() || "";
  const selectedPlan = planInfo[planParam];

  return (
    <AuthLayout
      title={selectedPlan ? `Cadastro - Plano ${selectedPlan.name}` : "Crie sua conta gratuita"}
      description={selectedPlan ? selectedPlan.description : "Junte-se a mais de 1.000 restaurantes que escolheram a liberdade"}
    >
      <RegisterForm selectedPlan={planParam} />
    </AuthLayout>
  );
};

export default Register;