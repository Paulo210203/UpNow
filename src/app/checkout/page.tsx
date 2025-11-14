"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Building2,
  Check,
  ArrowLeft,
  Lock,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix" | "boleto">("cartao");
  const [processando, setProcessando] = useState(false);

  const handlePagamento = async () => {
    setProcessando(true);
    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (metodoPagamento === "pix") {
      // Mostra QR Code PIX
      alert("QR Code PIX gerado! Em produção, aqui seria exibido o código PIX.");
    } else if (metodoPagamento === "boleto") {
      // Gera boleto
      alert("Boleto gerado! Em produção, o PDF seria baixado automaticamente.");
    } else {
      // Processa cartão
      alert("Pagamento processado com sucesso! Bem-vindo ao UpNow Pro!");
      window.location.href = "/";
    }
    
    setProcessando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header Simplificado */}
      <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  UpNow
                </h1>
              </div>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" className="text-purple-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Coluna Esquerda - Formulário de Pagamento */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Título */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Finalizar Assinatura</h2>
              <p className="text-sm sm:text-base text-purple-300">Escolha a forma de pagamento e complete sua assinatura Pro</p>
            </div>

            {/* Métodos de Pagamento */}
            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm p-4 sm:p-6">
              <Tabs value={metodoPagamento} onValueChange={(v) => setMetodoPagamento(v as any)}>
                <TabsList className="grid grid-cols-3 bg-slate-950/50 border border-purple-500/20 mb-4 sm:mb-6">
                  <TabsTrigger 
                    value="cartao"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 text-xs sm:text-sm"
                  >
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Cartão
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pix"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 text-xs sm:text-sm"
                  >
                    <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    PIX
                  </TabsTrigger>
                  <TabsTrigger 
                    value="boleto"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 text-xs sm:text-sm"
                  >
                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Boleto
                  </TabsTrigger>
                </TabsList>

                {/* Formulário Cartão de Crédito */}
                <TabsContent value="cartao" className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-purple-200 text-sm">Nome no Cartão</Label>
                    <Input 
                      id="nome"
                      placeholder="João Silva"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero" className="text-purple-200 text-sm">Número do Cartão</Label>
                    <Input 
                      id="numero"
                      placeholder="0000 0000 0000 0000"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="validade" className="text-purple-200 text-sm">Validade</Label>
                      <Input 
                        id="validade"
                        placeholder="MM/AA"
                        className="bg-slate-800/50 border-purple-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-purple-200 text-sm">CVV</Label>
                      <Input 
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        className="bg-slate-800/50 border-purple-500/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-purple-200 text-sm">CPF</Label>
                    <Input 
                      id="cpf"
                      placeholder="000.000.000-00"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-cyan-200 font-medium mb-1">Pagamento 100% Seguro</p>
                        <p className="text-xs text-cyan-300/80">
                          Seus dados são criptografados e protegidos. Não armazenamos informações do cartão.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* PIX */}
                <TabsContent value="pix" className="space-y-3 sm:space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 sm:p-6 text-center">
                    <QrCode className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-green-400 mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Pagamento via PIX</h3>
                    <p className="text-xs sm:text-sm text-green-200 mb-4">
                      Após clicar em "Finalizar Pagamento", você receberá um QR Code para escanear com o app do seu banco.
                    </p>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                      Aprovação Instantânea
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-pix" className="text-purple-200 text-sm">E-mail para Confirmação</Label>
                    <Input 
                      id="email-pix"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>
                </TabsContent>

                {/* Boleto */}
                <TabsContent value="boleto" className="space-y-3 sm:space-y-4">
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 sm:p-6 text-center">
                    <Building2 className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-orange-400 mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Pagamento via Boleto</h3>
                    <p className="text-xs sm:text-sm text-orange-200 mb-4">
                      O boleto será gerado após a confirmação. O prazo de compensação é de até 3 dias úteis.
                    </p>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                      Vencimento em 3 dias
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-boleto" className="text-purple-200 text-sm">E-mail para Envio</Label>
                    <Input 
                      id="email-boleto"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf-boleto" className="text-purple-200 text-sm">CPF</Label>
                    <Input 
                      id="cpf-boleto"
                      placeholder="000.000.000-00"
                      className="bg-slate-800/50 border-purple-500/30 text-white"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Botão de Pagamento */}
              <Button 
                onClick={handlePagamento}
                disabled={processando}
                className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold text-base sm:text-lg py-5 sm:py-6 shadow-xl shadow-yellow-500/30 transition-all hover:scale-105"
              >
                {processando ? (
                  <>Processando...</>
                ) : (
                  <>
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Finalizar Pagamento
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Coluna Direita - Resumo do Pedido */}
          <div className="space-y-4 sm:space-y-6">
            {/* Resumo */}
            <Card className="bg-gradient-to-br from-slate-900 to-purple-900 border-yellow-500/30 backdrop-blur-sm p-4 sm:p-6 lg:sticky lg:top-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">UpNow Pro</h3>
                  <p className="text-xs sm:text-sm text-purple-300">Assinatura Mensal</p>
                </div>
              </div>

              <Separator className="bg-purple-500/20 mb-4 sm:mb-6" />

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>IA emocional avançada</span>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>Reorganização ilimitada</span>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>500+ afirmações premium</span>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>Temas exclusivos</span>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>Análises semanais completas</span>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-xs sm:text-sm">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </div>
              </div>

              <Separator className="bg-purple-500/20 mb-4 sm:mb-6" />

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-purple-200 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>R$ 19,90</span>
                </div>
                <div className="flex justify-between text-green-400 font-medium text-sm sm:text-base">
                  <span>7 dias grátis</span>
                  <span>-R$ 0,00</span>
                </div>
                <Separator className="bg-purple-500/20" />
                <div className="flex justify-between text-white text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span>R$ 19,90</span>
                </div>
                <p className="text-xs text-purple-400 text-center">
                  Cobrança mensal recorrente
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                <p className="text-xs text-yellow-200 text-center">
                  🎁 <strong>7 dias grátis</strong> para testar todas as funcionalidades premium sem compromisso!
                </p>
              </div>
            </Card>

            {/* Garantia */}
            <Card className="bg-slate-900/50 border-green-500/30 backdrop-blur-sm p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">Garantia de 30 dias</h4>
                  <p className="text-xs text-green-200">
                    Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
