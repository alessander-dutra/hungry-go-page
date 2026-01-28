import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json() as { messages: Message[] };

    const systemPrompt = `Você é o assistente virtual do DeliveryPro, uma plataforma de delivery para restaurantes brasileiros.

Seu objetivo é ajudar os usuários com:
- Informações sobre planos e preços (Starter 5%, Professional 7%, Enterprise 8%)
- Funcionalidades da plataforma (site próprio, integração WhatsApp, gestão de cardápio, relatórios, IA)
- Processo de cadastro e migração
- Dúvidas gerais sobre delivery

Características:
- Seja amigável, prestativo e objetivo
- Responda sempre em português do Brasil
- Destaque as vantagens do DeliveryPro (comissões baixas vs 20-30% dos marketplaces)
- Incentive o usuário a se cadastrar ou agendar uma demonstração
- Se não souber algo, direcione para o email contato@deliverypro.com.br

Mantenha respostas concisas (máximo 3-4 parágrafos).`;

    const response = await fetch("https://api.ai.lovable.dev/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in support-chat function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erro ao processar mensagem",
        response: "Desculpe, ocorreu um erro técnico. Por favor, tente novamente ou entre em contato por email: contato@deliverypro.com.br"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
