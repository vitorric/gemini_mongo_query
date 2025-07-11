
import React from 'react';

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const QueryInput: React.FC<QueryInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="query-input" className="block text-sm font-medium text-slate-300 mb-2">
        Regra de Elegibilidade
      </label>
      <textarea
        id="query-input"
        rows={4}
        className="w-full p-4 bg-slate-800 border border-slate-600 rounded-lg shadow-inner text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200"
        placeholder="Ex: Total pago com PIX nos últimos 30 dias"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
