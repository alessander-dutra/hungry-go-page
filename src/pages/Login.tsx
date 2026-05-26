import { Helmet } from "react-helmet-async";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Entrar — DeliveryPro</title>
        <meta name="description" content="Acesse o painel do seu restaurante na DeliveryPro." />
        <link rel="canonical" href="/login" />
        <meta property="og:title" content="Entrar — DeliveryPro" />
        <meta property="og:description" content="Acesse o painel do seu restaurante." />
      </Helmet>
      <AuthLayout
        title="Bem-vindo de volta!"
        description="Faça login para acessar seu dashboard e gerenciar seu restaurante"
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Login;
