"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Sun, Heart, Zap, Target, Sparkles, X } from "lucide-react";

interface RitualMatinalProps {
  onComplete: (dados: { humor: number; energia: number }) => void;
  showClose?: boolean;
}

export function RitualMatinal({ onComplete, showClose }: RitualMatinalProps) {
  const [etapa, setEtapa] = useState(1);
  const [humor, setHumor] = useState([70]);
  const [energia, setEnergia] = useState([60]);
  const [metasDia, setMetasDia] = useState<string[]>([]);
  const [metaAtual, setMetaAtual] = useState("");

  const afirmacoesMatinais = [
    "Hoje é um novo dia cheio de possibilidades! 🌅",
    "Você é capaz de conquistar tudo que deseja! 💪",
    "Sua energia positiva vai transformar este dia! ✨",
    "Acredite no seu potencial e vá em frente! 🚀",
  ];

  const adicionarMeta = () => {
    if (metaAtual.trim() && metasDia.length < 3) {
      setMetasDia([...metasDia, metaAtual]);
      setMetaAtual("");
    }
  };

  const proximaEtapa = () => {
    if (etapa < 4) {
      setEtapa(etapa + 1);
    } else {
      onComplete({ humor: humor[0], energia: energia[0] });
    }
  };

  const pularRitual = () => {
    onComplete({ humor: 50, energia: 50 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-slate-900/80 border-orange-500/30 backdrop-blur-sm p-8 relative">
        {showClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={pularRitual}
            className="absolute top-4 right-4 text-orange-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mx-auto mb-4">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
            Acorda UpNow! ☀️
          </h2>
          <p className="text-orange-200">Vamos começar o dia com energia e propósito!</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`h-2 flex-1 rounded-full transition-all ${
                num <= etapa
                  ? "bg-gradient-to-r from-orange-400 to-red-600"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Etapa 1: Afirmação */}
        {etapa === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl p-6 border border-orange-500/30">
              <Sparkles className="w-8 h-8 text-orange-400 mb-4 mx-auto" />
              <p className="text-2xl text-white text-center font-medium leading-relaxed">
                {afirmacoesMatinais[Math.floor(Math.random() * afirmacoesMatinais.length)]}
              </p>
            </div>
            <p className="text-center text-orange-200 text-sm">
              Respire fundo e deixe essa energia positiva entrar em você! 🌟
            </p>
          </div>
        )}

        {/* Etapa 2: Humor */}
        {etapa === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Como você está se sentindo?
              </h3>
              <p className="text-orange-200 text-sm">
                Seja honesto consigo mesmo, não há resposta certa ou errada
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-orange-200">Seu humor:</span>
                <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-lg">
                  {humor[0] >= 70 ? "😊" : humor[0] >= 40 ? "😐" : "😔"} {humor[0]}%
                </Badge>
              </div>
              <Slider
                value={humor}
                onValueChange={setHumor}
                max={100}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-orange-300">
                <span>😔 Baixo</span>
                <span>😐 Médio</span>
                <span>😊 Alto</span>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 3: Energia */}
        {etapa === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Qual seu nível de energia?
              </h3>
              <p className="text-orange-200 text-sm">
                Isso vai me ajudar a organizar seu dia da melhor forma
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-orange-200">Sua energia:</span>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-lg">
                  {energia[0] >= 70 ? "⚡" : energia[0] >= 40 ? "🔋" : "🪫"} {energia[0]}%
                </Badge>
              </div>
              <Slider
                value={energia}
                onValueChange={setEnergia}
                max={100}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-orange-300">
                <span>🪫 Baixa</span>
                <span>🔋 Média</span>
                <span>⚡ Alta</span>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 4: Metas */}
        {etapa === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Quais suas 3 prioridades hoje?
              </h3>
              <p className="text-orange-200 text-sm">
                Metas pequenas e alcançáveis são mais efetivas!
              </p>
            </div>

            <div className="space-y-3">
              {metasDia.map((meta, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-lg p-3 border border-blue-500/30"
                >
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {index + 1}
                    </Badge>
                    <span className="text-white">{meta}</span>
                  </div>
                </div>
              ))}

              {metasDia.length < 3 && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={metaAtual}
                    onChange={(e) => setMetaAtual(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && adicionarMeta()}
                    placeholder={`Meta ${metasDia.length + 1}...`}
                    className="flex-1 bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white placeholder:text-orange-300/50 focus:outline-none focus:border-orange-500/50"
                  />
                  <Button
                    onClick={adicionarMeta}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    Adicionar
                  </Button>
                </div>
              )}
            </div>

            {metasDia.length === 0 && (
              <p className="text-center text-orange-300 text-sm">
                Adicione pelo menos uma meta para continuar
              </p>
            )}
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3 mt-8">
          {etapa > 1 && (
            <Button
              variant="outline"
              onClick={() => setEtapa(etapa - 1)}
              className="flex-1 border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={proximaEtapa}
            disabled={etapa === 4 && metasDia.length === 0}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
          >
            {etapa === 4 ? "Começar o Dia! 🚀" : "Próximo"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
