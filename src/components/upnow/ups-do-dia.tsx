"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Target, Award, TrendingUp } from "lucide-react";

interface UpsoDiaProps {
  onProgressChange: (progresso: number) => void;
}

interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  progresso: number;
  meta: number;
  concluida: boolean;
}

export function UpsoDia({ onProgressChange }: UpsoDiaProps) {
  const [conquistas, setConquistas] = useState<Conquista[]>([
    {
      id: "1",
      titulo: "Mestre da Produtividade",
      descricao: "Complete 5 tarefas hoje",
      icone: "⚡",
      progresso: 3,
      meta: 5,
      concluida: false,
    },
    {
      id: "2",
      titulo: "Guerreiro Emocional",
      descricao: "Escreva no diário por 3 dias seguidos",
      icone: "💪",
      progresso: 2,
      meta: 3,
      concluida: false,
    },
    {
      id: "3",
      titulo: "Estrela da Manhã",
      descricao: "Complete o ritual matinal 5 vezes",
      icone: "⭐",
      progresso: 4,
      meta: 5,
      concluida: false,
    },
    {
      id: "4",
      titulo: "Campeão da Autoestima",
      descricao: "Complete 10 desafios de autoconfiança",
      icone: "🏆",
      progresso: 7,
      meta: 10,
      concluida: false,
    },
  ]);

  const [pontosTotal, setPontosTotal] = useState(340);
  const [nivel, setNivel] = useState(3);

  useEffect(() => {
    const progressoGeral = conquistas.reduce((acc, c) => {
      return acc + (c.progresso / c.meta) * 100;
    }, 0) / conquistas.length;
    
    onProgressChange(Math.round(progressoGeral));
  }, [conquistas, onProgressChange]);

  const adicionarProgresso = (id: string) => {
    setConquistas(conquistas.map(c => {
      if (c.id === id && c.progresso < c.meta) {
        const novoProgresso = c.progresso + 1;
        const concluida = novoProgresso >= c.meta;
        
        if (concluida && !c.concluida) {
          setPontosTotal(prev => prev + 50);
        }
        
        return { ...c, progresso: novoProgresso, concluida };
      }
      return c;
    }));
  };

  const conquistasConcluidas = conquistas.filter(c => c.concluida).length;
  const proximoNivel = (nivel * 500) - pontosTotal;

  return (
    <div className="space-y-6">
      {/* Status do Jogador */}
      <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30 backdrop-blur-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">Nível {nivel}</h3>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {pontosTotal} pontos
              </Badge>
            </div>
            <p className="text-yellow-200 text-sm mb-4">
              Faltam {proximoNivel} pontos para o próximo nível!
            </p>
            <Progress value={(pontosTotal % 500) / 5} className="h-3 bg-yellow-950" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold text-white">{conquistasConcluidas}</div>
            <div className="text-xs text-yellow-200">Conquistas</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-2xl font-bold text-white">{pontosTotal}</div>
            <div className="text-xs text-yellow-200">Pontos</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-white">{nivel}</div>
            <div className="text-xs text-yellow-200">Nível</div>
          </div>
        </div>
      </Card>

      {/* Conquistas */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Suas Conquistas
        </h3>

        {conquistas.map((conquista) => {
          const porcentagem = (conquista.progresso / conquista.meta) * 100;
          
          return (
            <Card 
              key={conquista.id}
              className={`p-4 transition-all ${
                conquista.concluida
                  ? "bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30"
                  : "bg-slate-900/50 border-purple-500/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{conquista.icone}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{conquista.titulo}</h4>
                      <p className="text-sm text-purple-200">{conquista.descricao}</p>
                    </div>
                    {conquista.concluida && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Award className="w-3 h-3 mr-1" />
                        Completo!
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-300">
                        {conquista.progresso} / {conquista.meta}
                      </span>
                      <span className="text-purple-300">{Math.round(porcentagem)}%</span>
                    </div>
                    <Progress value={porcentagem} className="h-2 bg-purple-950" />
                  </div>

                  {!conquista.concluida && (
                    <Button
                      size="sm"
                      onClick={() => adicionarProgresso(conquista.id)}
                      className="mt-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Adicionar Progresso
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Motivação */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-indigo-200">
              <strong className="text-white">Continue assim!</strong> Cada conquista é um passo na sua evolução. Você está indo muito bem! 🌟
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
