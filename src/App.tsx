import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { StatusView } from './components/StatusView';
import type { ApiResponse, FormData, ViewState } from './types';

const WEBHOOK_URL = import.meta.env.VITE_API_URL
const API_USER = import.meta.env.VITE_API_USER
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD

export function App() {
  const [view, setView] = useState<ViewState>('idle');
  const [response, setResponse] = useState<ApiResponse | undefined>();
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', descricao: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setView('loading');

    try {
      // Create Basic Auth header
      const credentials = btoa(`${API_USER}:${API_PASSWORD}`);

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();
      setResponse(data);

      if (res.status === 200) setView('success_200');
      else if (res.status === 202) setView('success_202');
      else setView('error');

    } catch (error) {
      setView('error');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[900px] w-full min-h-0 md:min-h-[560px] rounded-sm overflow-hidden shadow-[0_24px_80px_rgba(24,32,82,0.13)]">

        {/* LEFT PANEL */}
        <div className="bg-navy px-8 py-10 md:px-12 md:py-14 flex flex-col justify-between relative overflow-hidden min-h-[180px] md:min-h-0">
          {/* Decorative circles */}
          <div className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full border border-accent/18" />
          <div className="absolute -bottom-[40px] -left-[40px] w-[180px] h-[180px] rounded-full border border-accent/12" />

          <div className="relative z-10">
            <div className="w-9 h-[3px] bg-accent mb-6" />
            <h1 className="font-serif text-[28px] font-normal text-white leading-[1.3] tracking-[-0.01em]">
              Cadastre seu<br /><span className="text-accent">Terreno</span>
            </h1>
          </div>

          <div className="relative z-10">
            <div className="w-6 h-[1px] bg-accent opacity-70 mb-3" />
            <p className="text-white/50 text-[12.5px] font-light leading-[1.7] tracking-[0.02em]">
              Preencha o formulário ao lado com os dados do terreno que deseja anunciar. Nossa equipe entrará em contato em breve.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white px-8 py-10 md:px-12 md:py-14 flex flex-col justify-center">
          {view === 'idle' ? (
            <>
              <div className="mb-10">
                <h2 className="font-serif text-[21.6px] font-normal text-navy tracking-[-0.01em]">Dados do Corretor</h2>
                <p className="text-muted text-[12.8px] font-light mt-[0.35rem]">Todos os campos são obrigatórios</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6 relative">
                  <label htmlFor="nome" className="block text-[11.2px] font-medium tracking-[0.1em] uppercase text-navy opacity-70 mb-[0.55rem]">
                    Nome do Corretor
                  </label>
                  <input
                    id="nome"
                    required
                    type="text"
                    placeholder="Ex: João Silva"
                    className="w-full border-0 border-b-[1.5px] border-border bg-transparent py-[0.65rem] px-0 font-sans text-[14.4px] font-light text-[#1a1a2e] outline-none transition-colors placeholder:text-[#c0c4d6] placeholder:font-light focus:border-navy"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>

                <div className="mb-6 relative">
                  <label htmlFor="email" className="block text-[11.2px] font-medium tracking-[0.1em] uppercase text-navy opacity-70 mb-[0.55rem]">
                    E-mail
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="joao@imobiliaria.com.br"
                    className="w-full border-0 border-b-[1.5px] border-border bg-transparent py-[0.65rem] px-0 font-sans text-[14.4px] font-light text-[#1a1a2e] outline-none transition-colors placeholder:text-[#c0c4d6] placeholder:font-light focus:border-navy"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="mb-6 relative">
                  <label htmlFor="descricao" className="block text-[11.2px] font-medium tracking-[0.1em] uppercase text-navy opacity-70 mb-[0.55rem]">
                    Descrição do Terreno
                  </label>
                  <textarea
                    id="descricao"
                    required
                    placeholder="Ex: Tenho um terreno de 500m² em Florianópolis, frente mar, por 2 milhões..."
                    className="w-full border-0 border-b-[1.5px] border-border bg-transparent py-[0.65rem] px-0 font-sans text-[14.4px] font-light text-[#1a1a2e] outline-none transition-colors placeholder:text-[#c0c4d6] placeholder:font-light focus:border-navy resize-none min-h-[90px] leading-[1.6]"
                    value={formData.descricao}
                    onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-4 bg-navy text-white border-0 font-sans text-[12.5px] font-medium tracking-[0.12em] uppercase cursor-pointer transition-all rounded-sm hover:bg-[#0f183d] hover:-translate-y-px active:translate-y-0"
                >
                  Enviar Informações
                </button>
              </form>
            </>
          ) : view === 'loading' ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-navy" size={32} />
              <p className="text-muted text-xs tracking-widest uppercase">Processando Proposta...</p>
            </div>
          ) : (
            <StatusView
              type={view === 'success_200' ? '200' : view === 'success_202' ? '202' : 'error'}
              data={response}
              onReset={() => setView('idle')}
            />
          )}
        </div>
      </div>
    </div>
  );
}