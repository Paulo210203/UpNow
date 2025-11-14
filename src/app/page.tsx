"use client";

import { useState, useEffect } from "react";
import { Sparkles, Brain, Calendar, Heart, Trophy, Zap, Sun, Moon, Target, TrendingUp, Bell, Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PlannerInteligente } from "@/components/upnow/planner-inteligente";
import { DiarioEmocional } from "@/components/upnow/diario-emocional";
import { CoachEmocional } from "@/components/upnow/coach-emocional";
import { UpsoDia } from "@/components/upnow/ups-do-dia";
import { RitualMatinal } from "@/components/upnow/ritual-matinal";

export default function UpNowApp() {
  const [showRitual, setShowRitual] = useState(false);
  const [humor, setHumor] = useState(75);
  const [energia, setEnergia] = useState(60);
  const [produtividade, setProdutividade] = useState(45);
  const [progressoSemanal, setProgressoSemanal] = useState(68);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    // Simula ritual matinal na primeira visita
    const ritualCompleto = localStorage.getItem("upnow-ritual-hoje");
    const hoje = new Date().toDateString();
    
    if (ritualCompleto !== hoje) {
      setShowRitual(true);
    }

    // Carrega preferência de notificações
    const notifPreference = localStorage.getItem("upnow-notificacoes");
    if (notifPreference === "true") {
      setNotificacoesAtivas(true);
    }
  }, []);

  const handleRitualCompleto = (dados: { humor: number; energia: number }) => {
    setHumor(dados.humor);
    setEnergia(dados.energia);
    setShowRitual(false);
    localStorage.setItem("upnow-ritual-hoje", new Date().toDateString());
  };

  const reorganizarDia = () => {
    // Simula reorganização inteligente
    setProdutividade(prev => Math.min(100, prev + 15));
    // Feedback visual
    const btn = document.querySelector('[data-reorganizar]');
    if (btn) {
      btn.classList.add('animate-pulse');
      setTimeout(() => btn.classList.remove('animate-pulse'), 1000);
    }
  };

  const toggleNotificacoes = async () => {
    if (!notificacoesAtivas) {
      // Solicita permissão para notificações
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setNotificacoesAtivas(true);
          localStorage.setItem("upnow-notificacoes", "true");
          // Mostra notificação de confirmação
          new Notification("UpNow 🚀", {
            body: "Notificações ativadas! Vamos te lembrar dos seus rituais e metas.",
            icon: "/icon.svg"
          });
        }
      }
    } else {
      setNotificacoesAtivas(false);
      localStorage.setItem("upnow-notificacoes", "false");
    }
  };

  const handleAssinarPro = () => {
    // Redireciona para página de compra (pode ser ajustado para o link real)
    window.open("https://pay.hotmart.com/exemplo-upnow-pro", "_blank");
  };

  if (showRitual) {
    return <RitualMatinal onComplete={handleRitualCompleto} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  UpNow
                </h1>
                <p className="text-xs text-purple-300">Levante-se. Evolua.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Botão de Notificações */}
              <div className="flex items-center gap-2 bg-slate-900/50 border border-purple-500/20 rounded-lg px-3 py-2">
                <Bell className={`w-4 h-4 ${notificacoesAtivas ? "text-cyan-400" : "text-purple-300"}`} />
                <span className="text-sm text-purple-200 hidden sm:inline">Notificações</span>
                <Switch 
                  checked={notificacoesAtivas}
                  onCheckedChange={toggleNotificacoes}
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>

              {/* Botão Upgrade */}
              <Button 
                onClick={() => setShowUpgrade(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-yellow-500/30"
              >
                <Crown className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Pro</span>
              </Button>

              <Button 
                data-reorganizar
                onClick={reorganizarDia}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30"
              >
                <Zap className="w-4 h-4 mr-2" />
                UpNow!
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Upgrade */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gradient-to-br from-slate-900 to-purple-900 border-yellow-500/30 max-w-lg w-full p-8 relative">
            {/* Botão Sair */}
            <Button 
              onClick={() => setShowUpgrade(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-purple-300 hover:text-white hover:bg-purple-800/50"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">UpNow Pro</h2>
              <p className="text-purple-200">Desbloqueie todo o potencial do seu crescimento</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Inteligência emocional avançada com análises profundas</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Reorganização automática ilimitada do seu dia</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Biblioteca premium com 500+ afirmações personalizadas</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Temas visuais exclusivos e personalizáveis</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Conquistas especiais e gamificação avançada</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Análises semanais completas com insights da IA</span>
              </div>
              <div className="flex items-start gap-3 text-purple-100">
                <span className="text-cyan-400">✓</span>
                <span>Suporte prioritário e atualizações exclusivas</span>
              </div>
            </div>

            <div className="bg-slate-950/50 rounded-xl p-6 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-white">R$ 19,90</span>
                <span className="text-purple-300">/mês</span>
              </div>
              <p className="text-sm text-purple-300">Cancele quando quiser, sem compromisso</p>
            </div>

            <Button 
              onClick={handleAssinarPro}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold text-lg py-6 shadow-xl shadow-yellow-500/30 transition-all hover:scale-105"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar UpNow Pro
            </Button>

            <p className="text-xs text-center text-purple-400 mt-4">
              7 dias de teste grátis • Sem cartão de crédito necessário
            </p>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card Humor */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border-purple-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-sm font-medium text-purple-200">Humor do Dia</span>
              </div>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                {humor >= 70 ? "😊" : humor >= 40 ? "😐" : "😔"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{humor}%</span>
                <span className="text-sm text-purple-300 mb-1">positivo</span>
              </div>
              <Progress value={humor} className="h-2 bg-purple-950" />
            </div>
          </Card>

          {/* Card Energia */}
          <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 border-cyan-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-cyan-200">Energia Atual</span>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {energia >= 70 ? "⚡" : energia >= 40 ? "🔋" : "🪫"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{energia}%</span>
                <span className="text-sm text-cyan-300 mb-1">disponível</span>
              </div>
              <Progress value={energia} className="h-2 bg-cyan-950" />
            </div>
          </Card>

          {/* Card Produtividade */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border-blue-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-blue-200">Produtividade</span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Prevista
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{produtividade}%</span>
                <span className="text-sm text-blue-300 mb-1">hoje</span>
              </div>
              <Progress value={produtividade} className="h-2 bg-blue-950" />
            </div>
          </Card>

          {/* Card Progresso Semanal */}
          <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-950/40 border-indigo-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-200">Progresso</span>
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                Semanal
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{progressoSemanal}%</span>
                <span className="text-sm text-indigo-300 mb-1">completo</span>
              </div>
              <Progress value={progressoSemanal} className="h-2 bg-indigo-950" />
            </div>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-purple-500/20 p-1 grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger 
              value="planner"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diario"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Diário</span>
            </TabsTrigger>
            <TabsTrigger 
              value="coach"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Coach</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ups"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Up's</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ritual"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Sun className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Ritual</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-4">
            <PlannerInteligente humor={humor} energia={energia} />
          </TabsContent>

          <TabsContent value="diario" className="space-y-4">
            <DiarioEmocional onHumorChange={setHumor} />
          </TabsContent>

          <TabsContent value="coach" className="space-y-4">
            <CoachEmocional humor={humor} energia={energia} />
          </TabsContent>

          <TabsContent value="ups" className="space-y-4">
            <UpsoDia onProgressChange={setProgressoSemanal} />
          </TabsContent>

          <TabsContent value="ritual" className="space-y-4">
            <RitualMatinal onComplete={handleRitualCompleto} showClose />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-950/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-purple-300">
            UpNow — Organize sua vida. Eleve sua mente. 💜
          </p>
        </div>
      </footer>
    </div>
  );
}
