import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      description="Faça login para acessar seu dashboard e gerenciar seu restaurante"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;