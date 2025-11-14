"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Smile, Meh, Frown, Sparkles } from "lucide-react";

interface DiarioEmocionalProps {
  onHumorChange: (humor: number) => void;
}

const emocoes = [
  { emoji: "😊", label: "Feliz", valor: 90, cor: "from-green-400 to-emerald-600" },
  { emoji: "😌", label: "Calmo", valor: 75, cor: "from-blue-400 to-cyan-600" },
  { emoji: "😐", label: "Neutro", valor: 50, cor: "from-gray-400 to-slate-600" },
  { emoji: "😔", label: "Triste", valor: 30, cor: "from-purple-400 to-indigo-600" },
  { emoji: "😰", label: "Ansioso", valor: 40, cor: "from-yellow-400 to-orange-600" },
  { emoji: "😤", label: "Irritado", valor: 35, cor: "from-red-400 to-pink-600" },
];

export function DiarioEmocional({ onHumorChange }: DiarioEmocionalProps) {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState<typeof emocoes[0] | null>(null);
  const [texto, setTexto] = useState("");
  const [feedbackIA, setFeedbackIA] = useState("");
  const [mostrarFeedback, setMostrarFeedback] = useState(false);

  const selecionarEmocao = (emocao: typeof emocoes[0]) => {
    setEmocaoSelecionada(emocao);
    onHumorChange(emocao.valor);
  };

  const salvarDiario = () => {
    if (!emocaoSelecionada) return;

    // Simula feedback da IA baseado na emoção
    let feedback = "";
    
    if (emocaoSelecionada.valor >= 70) {
      feedback = "Que incrível ver você assim! Continue cultivando esses momentos positivos. Você está no caminho certo! 🌟";
    } else if (emocaoSelecionada.valor >= 50) {
      feedback = "Dias neutros também são importantes. Que tal fazer algo pequeno que te deixe feliz hoje? Uma música, um lanche especial... 🎵";
    } else if (emocaoSelecionada.valor >= 40) {
      feedback = "Entendo que você está passando por um momento difícil. Lembre-se: sentimentos são temporários. Você é mais forte do que imagina. 💪";
    } else {
      feedback = "Sinto muito que esteja se sentindo assim. Seja gentil consigo mesmo hoje. Faça pausas, respire fundo. Você não está sozinho. 💜";
    }

    setFeedbackIA(feedback);
    setMostrarFeedback(true);

    // Salva no localStorage
    const entrada = {
      data: new Date().toISOString(),
      emocao: emocaoSelecionada.label,
      texto,
      valor: emocaoSelecionada.valor,
    };
    
    const historico = JSON.parse(localStorage.getItem("upnow-diario") || "[]");
    historico.push(entrada);
    localStorage.setItem("upnow-diario", JSON.stringify(historico));
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Emoção */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-semibold text-white">Como você está se sentindo?</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {emocoes.map((emocao) => (
            <button
              key={emocao.label}
              onClick={() => selecionarEmocao(emocao)}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                emocaoSelecionada?.label === emocao.label
                  ? `bg-gradient-to-br ${emocao.cor} border-white shadow-lg`
                  : "bg-slate-800/50 border-purple-500/30 hover:border-purple-500/50"
              }`}
            >
              <div className="text-4xl mb-2">{emocao.emoji}</div>
              <div className="text-xs text-white font-medium">{emocao.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Área de Escrita */}
      {emocaoSelecionada && (
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-purple-200 mb-2 block">
                O que está passando pela sua cabeça?
              </label>
              <Textarea
                placeholder="Escreva livremente sobre seus sentimentos, pensamentos ou o que aconteceu hoje..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="min-h-[200px] bg-slate-800/50 border-purple-500/30 text-white placeholder:text-purple-300/50 resize-none"
              />
            </div>
            
            <Button 
              onClick={salvarDiario}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Salvar e Receber Feedback da IA
            </Button>
          </div>
        </Card>
      )}

      {/* Feedback da IA */}
      {mostrarFeedback && (
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 backdrop-blur-sm p-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Mensagem do Coach IA</h3>
              <p className="text-indigo-200 leading-relaxed">{feedbackIA}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Dica do Dia */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            💡
          </div>
          <div className="flex-1">
            <p className="text-sm text-cyan-200">
              <strong className="text-white">Dica:</strong> Escrever sobre seus sentimentos ajuda a processar emoções e reduzir ansiedade. Tente fazer isso diariamente!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
