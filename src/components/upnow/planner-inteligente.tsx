"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Clock, AlertCircle, CheckCircle2, Flame, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Tarefa {
  id: string;
  titulo: string;
  prioridade: "alta" | "media" | "baixa";
  tempo: string;
  concluida: boolean;
  energiaNecessaria: number;
}

interface PlannerInteligenteProps {
  humor: number;
  energia: number;
}

export function PlannerInteligente({ humor, energia }: PlannerInteligenteProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: "1",
      titulo: "Estudar para prova de matemática",
      prioridade: "alta",
      tempo: "09:00 - 11:00",
      concluida: false,
      energiaNecessaria: 80,
    },
    {
      id: "2",
      titulo: "Fazer exercícios físicos",
      prioridade: "media",
      tempo: "14:00 - 15:00",
      concluida: false,
      energiaNecessaria: 60,
    },
    {
      id: "3",
      titulo: "Responder e-mails",
      prioridade: "baixa",
      tempo: "16:00 - 16:30",
      concluida: false,
      energiaNecessaria: 30,
    },
  ]);

  const [novaTarefa, setNovaTarefa] = useState("");

  const toggleTarefa = (id: string) => {
    setTarefas(tarefas.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const nova: Tarefa = {
        id: Date.now().toString(),
        titulo: novaTarefa,
        prioridade: "media",
        tempo: "A definir",
        concluida: false,
        energiaNecessaria: 50,
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa("");
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "media": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "baixa": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const tarefasRecomendadas = tarefas.filter(t => !t.concluida && t.energiaNecessaria <= energia);
  const tarefasPesadas = tarefas.filter(t => !t.concluida && t.energiaNecessaria > energia);

  return (
    <div className="space-y-6">
      {/* Análise IA */}
      <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 backdrop-blur-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Análise Inteligente do Dia</h3>
            <p className="text-cyan-200 text-sm leading-relaxed">
              {energia >= 70 
                ? "Sua energia está ótima! É o momento perfeito para tarefas que exigem mais foco. Recomendo começar pelas prioridades altas."
                : energia >= 40
                ? "Sua energia está moderada. Alterne entre tarefas leves e médias para manter o ritmo sem sobrecarregar."
                : "Sua energia está baixa. Foque em tarefas simples e faça pausas frequentes. Deixe as tarefas pesadas para quando estiver melhor."
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Adicionar Nova Tarefa */}
      <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && adicionarTarefa()}
            className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
          />
          <Button 
            onClick={adicionarTarefa}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Tarefas Recomendadas */}
      {tarefasRecomendadas.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Recomendadas para Agora</h3>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              {tarefasRecomendadas.length}
            </Badge>
          </div>
          
          {tarefasRecomendadas.map((tarefa) => (
            <Card 
              key={tarefa.id}
              className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-sm p-4 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={tarefa.concluida}
                  onCheckedChange={() => toggleTarefa(tarefa.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className={`font-medium ${tarefa.concluida ? 'line-through text-gray-500' : 'text-white'}`}>
                      {tarefa.titulo}
                    </h4>
                    <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                      {tarefa.prioridade}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-cyan-300">
                      <Clock className="w-4 h-4" />
                      {tarefa.tempo}
                    </div>
                    <div className="flex items-center gap-1 text-green-300">
                      <Flame className="w-4 h-4" />
                      {tarefa.energiaNecessaria}% energia
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tarefas Pesadas */}
      {tarefasPesadas.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Deixe para Depois</h3>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              {tarefasPesadas.length}
            </Badge>
          </div>
          
          {tarefasPesadas.map((tarefa) => (
            <Card 
              key={tarefa.id}
              className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30 backdrop-blur-sm p-4 opacity-60"
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={tarefa.concluida}
                  onCheckedChange={() => toggleTarefa(tarefa.id)}
                  className="mt-1"
                  disabled
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-medium text-white">
                      {tarefa.titulo}
                    </h4>
                    <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                      {tarefa.prioridade}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-orange-300">
                      <Clock className="w-4 h-4" />
                      {tarefa.tempo}
                    </div>
                    <div className="flex items-center gap-1 text-red-300">
                      <Flame className="w-4 h-4" />
                      {tarefa.energiaNecessaria}% energia (muito alta)
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
