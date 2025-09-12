import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-background/10 text-background border-background/20">
              Últimas vagas disponíveis
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pronto para{" "}
              <span className="text-primary">revolucionar</span>{" "}
              seu delivery?
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Junte-se a mais de 1.000 restaurantes que já escolheram a liberdade e a tecnologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="xl" className="group bg-background text-foreground hover:bg-background/90" asChild>
                <a href="/register">
                  Começar Gratuitamente
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="xl" className="border-background/20 text-background hover:bg-background/10" asChild>
                <a href="/login">Agendar Demonstração</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-primary">DeliveryPro</span>
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              A plataforma de delivery mais justa do Brasil. 
              Tecnologia avançada com preços que fazem sentido.
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-background/10 text-background border-background/20">
                🇧🇷 Feito no Brasil
              </Badge>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produto</h3>
            <ul className="space-y-3 text-background/70">
              <li><a href="#features" className="hover:text-primary transition-colors">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3 text-background/70">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Parceiros</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-background/70">
                <Mail size={18} className="text-primary" />
                <span>contato@deliverypro.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone size={18} className="text-primary" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin size={18} className="text-primary" />
                <span>São Paulo, SP</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Suporte 24/7</h4>
              <Button variant="outline" size="sm" className="border-background/20 text-background hover:bg-background/10">
                Abrir Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-background/50">
            © 2024 DeliveryPro. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;