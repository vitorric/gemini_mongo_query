
import React, { useState, useEffect } from 'react';

interface ResultDisplayProps {
  query: string;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ query, isLoading }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copiar');
  const [formattedQuery, setFormattedQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      try {
        const parsed = JSON.parse(query);
        setFormattedQuery(JSON.stringify(parsed, null, 2));
        setError(null);
      } catch (e) {
        setFormattedQuery(query);
        setError('A resposta da API não é um JSON válido.');
        console.error("JSON parsing error:", e);
      }
    } else {
      setFormattedQuery('');
      setError(null);
    }
  }, [query]);

  const handleCopy = () => {
    if (formattedQuery) {
      navigator.clipboard.writeText(formattedQuery);
      setCopyButtonText('Copiado!');
      setTimeout(() => setCopyButtonText('Copiar'), 2000);
    }
  };
  
  const Placeholder = () => (
     <div className="animate-pulse space-y-2">
        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
      </div>
  )

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Query Gerada
      </label>
      <div className="relative bg-brand-secondary/50 border border-slate-700 rounded-lg shadow-lg">
        <div className="p-4 min-h-[150px] overflow-x-auto">
          {isLoading ? <Placeholder /> : (
          <pre><code className="language-json text-slate-300">{formattedQuery}</code></pre>
          )}
          {!isLoading && !query && <div className="text-slate-500">Sua query MongoDB aparecerá aqui...</div>}
        </div>
        {formattedQuery && !isLoading && (
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 bg-slate-600 text-slate-200 text-xs font-semibold rounded hover:bg-slate-500 transition-colors"
            >
                {copyButtonText}
            </button>
        )}
        {error && (
            <div className="border-t border-red-700 bg-red-900/50 text-red-300 px-4 py-2 text-sm">
                {error}
            </div>
        )}
      </div>
    </div>
  );
};
