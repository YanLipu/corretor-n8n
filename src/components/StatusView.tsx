import { Check, RefreshCcw } from 'lucide-react';
import type { ApiResponse } from '../types';

interface StatusViewProps {
  type: '200' | '202' | 'error';
  data?: ApiResponse;
  onReset: () => void;
}

export const StatusView = ({ type, data, onReset }: StatusViewProps) => {
  const is200 = type === '200';
  const is202 = type === '202';
  const isError = type === 'error';
  const isSuccess = is200 || is202;

  return (
    <div className="text-center py-6">
      {isSuccess && (
        <div className="w-12 h-12 rounded-full bg-navy/6 flex items-center justify-center mx-auto mb-4">
          <Check className="stroke-navy" size={24} strokeWidth={2.5} />
        </div>
      )}

      {isError && (
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">❌</span>
        </div>
      )}

      <h3 className="font-serif text-[17.6px] font-normal text-navy mb-1">
        {isError ? 'Ops! Algo deu errado' : 'Recebemos seu contato'}
      </h3>

      <p className="text-muted text-[13.1px] mt-[0.4rem] mb-6">
        {data?.message || (isError ? 'Não foi possível processar sua solicitação no momento.' : 'Sua mensagem foi enviada com sucesso.')}
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-2 mx-auto text-xs font-medium uppercase tracking-widest text-navy hover:opacity-70 transition-opacity"
      >
        <RefreshCcw size={14} /> Voltar ao formulário
      </button>
    </div>
  );
};