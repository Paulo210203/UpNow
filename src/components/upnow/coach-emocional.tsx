"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Heart, Zap, Target, TrendingUp } from "lucide-react";

interface CoachEmocionalProps {
  humor: number;
  energia: number;
}

const afirmacoes = {
  alta: [
    "Você é capaz de conquistar tudo que deseja! 🌟",
    "Sua energia positiva transforma tudo ao seu redor! ✨",
    "Continue assim, você está brilhando! 💫",
    "Cada passo seu é uma vitória! 🏆",
  ],
  media: [
    "Você está indo bem, continue no seu ritmo! 🌱",
    "Pequenos progressos são grandes vitórias! 💪",
    "Acredite no seu potencial! 🌟",
    "Você é mais forte do que imagina! 💜",
  ],
  baixa: [
    "Dias difíceis não duram para sempre. Você vai superar! 🌈",
    "Seja gentil consigo mesmo hoje. Você merece! 💜",
    "Você não está sozinho. Estou aqui com você! 🤗",
    "Amanhã é um novo dia cheio de possibilidades! 🌅",
  ],
};

const desafios = [
  {
    titulo: "Gratidão Matinal",
    descricao: "Liste 3 coisas pelas quais você é grato hoje",
    icone: "🙏",
    pontos: 10,
  },
  {
    titulo: "Momento de Respiração",
    descricao: "Faça 5 respirações profundas e conscientes",
    icone: "🧘",
    pontos: 5,
  },
  {
    titulo: "Elogio Próprio",
    descricao: "Diga 3 qualidades suas em voz alta",
    icone: "💪",
    pontos: 15,
  },
  {
    titulo: "Ato de Gentileza",
    descricao: "Faça algo gentil por alguém hoje",
    icone: "💝",
    pontos: 20,
  },
];

export function CoachEmocional({ humor, energia }: CoachEmocionalProps) {
  const [afirmacaoAtual, setAfirmacaoAtual] = useState(0);
  const [desafiosConcluidos, setDesafiosConcluidos] = useState<number[]>([]);

  const nivel = humor >= 70 ? "alta" : humor >= 40 ? "media" : "baixa";
  const afirmacoesNivel = afirmacoes[nivel];

  const proximaAfirmacao = () => {
    setAfirmacaoAtual((prev) => (prev + 1) % afirmacoesNivel.length);
  };

  const concluirDesafio = (index: number) => {
    if (!desafiosConcluidos.includes(index)) {
      setDesafiosConcluidos([...desafiosConcluidos, index]);
    }
  };

  const pontosTotal = desafiosConcluidos.reduce((acc, idx) => acc + desafios[idx].pontos, 0);

  return (
    <div className="space-y-6">
      {/* Mensagem Motivacional Principal */}
      <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 backdrop-blur-sm p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Seu Coach Emocional</h3>
            <p className="text-indigo-200 text-sm">
              Estou aqui para te apoiar e fortalecer sua autoestima todos os dias! 💜
            </p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
          <p className="text-2xl text-white text-center font-medium leading-relaxed">
            {afirmacoesNivel[afirmacaoAtual]}
          </p>
        </div>

        <Button 
          onClick={proximaAfirmacao}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Nova Afirmação
        </Button>
      </Card>

      {/* Análise Emocional */}
      <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Análise do Seu Estado Atual
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-cyan-200">Humor</span>
            <Badge className={`${
              humor >= 70 ? "bg-green-500/20 text-green-300 border-green-500/30" :
              humor >= 40 ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
              "bg-red-500/20 text-red-300 border-red-500/30"
            }`}>
              {humor >= 70 ? "Excelente" : humor >= 40 ? "Moderado" : "Precisa de Atenção"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-cyan-200">Energia</span>
            <Badge className={`${
              energia >= 70 ? "bg-green-500/20 text-green-300 border-green-500/30" :
              energia >= 40 ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
              "bg-red-500/20 text-red-300 border-red-500/30"
            }`}>
              {energia >= 70 ? "Alta" : energia >= 40 ? "Média" : "Baixa"}
            </Badge>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 mt-4">
            <p className="text-sm text-cyan-200 leading-relaxed">
              {humor >= 70 && energia >= 70 && "Você está em um ótimo momento! Aproveite essa energia para realizar suas metas e celebrar suas conquistas! 🎉"}
              {humor >= 70 && energia < 70 && "Seu humor está ótimo, mas sua energia precisa de atenção. Faça pausas e cuide de você! 🌟"}
              {humor < 70 && energia >= 70 && "Você tem energia, mas seu humor precisa de cuidado. Que tal fazer algo que te deixe feliz? 💜"}
              {humor < 70 && energia < 70 && "Hoje está sendo um dia desafiador. Seja gentil consigo mesmo e faça apenas o essencial. Amanhã será melhor! 🌈"}
            </p>
          </div>
        </div>
      </Card>

      {/* Desafios de Autoconfiança */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" />
            Desafios de Hoje
          </h3>
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            {pontosTotal} pontos
          </Badge>
        </div>

        {desafios.map((desafio, index) => {
          const concluido = desafiosConcluidos.includes(index);
          
          return (
            <Card 
              key={index}
              className={`p-4 transition-all ${
                concluido
                  ? "bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30"
                  : "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{desafio.icone}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{desafio.titulo}</h4>
                  <p className="text-sm text-purple-200">{desafio.descricao}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    +{desafio.pontos}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => concluirDesafio(index)}
                    disabled={concluido}
                    className={concluido 
                      ? "bg-green-600 hover:bg-green-600" 
                      : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    }
                  >
                    {concluido ? "✓ Feito" : "Concluir"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
