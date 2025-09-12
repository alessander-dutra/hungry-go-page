import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Crie sua conta gratuita"
      description="Junte-se a mais de 1.000 restaurantes que escolheram a liberdade"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;