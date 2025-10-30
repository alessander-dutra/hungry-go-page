# Instruções para Agentes de IA - Hungry Go Page

Este documento fornece orientações essenciais para trabalhar com esta base de código.

## Arquitetura e Estrutura

Este é um aplicativo React moderno construído com:
- Vite como bundler
- TypeScript para tipagem estática
- TailwindCSS para estilização
- Radix UI + shadcn/ui para componentes de interface
- React Router para navegação
- React Query para gerenciamento de estado do servidor
- React Hook Form + Zod para formulários e validação

### Estrutura de Diretórios Principal

```
src/
├── components/     # Componentes React reutilizáveis
│   ├── auth/      # Componentes relacionados à autenticação
│   ├── checkout/  # Componentes do processo de checkout
│   ├── dashboard/ # Interface do dashboard
│   ├── ui/        # Componentes base do shadcn/ui
│   └── whatsapp/  # Integração com WhatsApp
├── hooks/         # Hooks React personalizados
├── lib/          # Utilitários e funções auxiliares
└── pages/        # Componentes de página/rota
```

## Padrões e Convenções

### Componentes UI
- Todos os componentes base estão em `src/components/ui/`
- Utilizam o padrão do shadcn/ui com Radix + Tailwind
- Exemplo em `src/components/ui/button.tsx`

### Formulários
- Usar React Hook Form + Zod para validação
- Exemplos em `src/components/auth/LoginForm.tsx` e `RegisterForm.tsx`

### Estado
- Estado local: React useState/useReducer
- Estado do servidor: React Query
- Estado do carrinho: Hook personalizado em `src/hooks/useCart.ts`

### Estilização
- Usar Tailwind CSS para toda estilização
- Seguir convenções do shadcn/ui para variantes de componentes
- Definir temas no arquivo `components.json`

## Fluxos de Desenvolvimento

### Comandos Principais
```bash
# Desenvolvimento
bun dev          # Inicia servidor de desenvolvimento

# Build
bun build        # Build para produção
bun build:dev    # Build para desenvolvimento

# Linting
bun lint         # Executa ESLint
```

### Adicionando Novos Componentes UI
1. Use o CLI do shadcn/ui: `bunx shadcn-ui add [component]`
2. O componente será adicionado em `src/components/ui/`
3. Personalize usando o sistema de variantes do Tailwind

### Debugging
- Use o React DevTools para inspeção de componentes
- React Query DevTools disponível em desenvolvimento
- Verifique o console para erros de TypeScript/ESLint

## Pontos de Integração

### APIs e Serviços
- Elevenlabs para síntese de voz (`@11labs/react`)
- WhatsApp para comunicação com clientes
- Sistema de pagamentos (a ser implementado)

### Comunicação Entre Componentes
- Props para dados descendentes
- Context para estado global (tema, carrinho)
- React Query para estado do servidor
- Eventos personalizados para comunicação entre componentes não relacionados

## Links Úteis
- [Documentação do shadcn/ui](https://ui.shadcn.com)
- [Guia do Tailwind CSS](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)