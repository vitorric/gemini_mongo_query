
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultMarkdownProps {
  markdown: string;
  isLoading: boolean;
}

export const ResultMarkdown: React.FC<ResultMarkdownProps> = ({ markdown, isLoading }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copiar');

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
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
        Resultado Final
      </label>
      <div className="relative bg-brand-secondary/50 border border-slate-700 rounded-lg shadow-lg">
        <div className="p-4 min-h-[150px] overflow-x-auto">
          {isLoading ? <Placeholder /> : (
            <div className="pt-10 markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          )}
          {!isLoading && !markdown && <div className="text-slate-500">Seu resultado final aparecerá aqui...</div>}
        </div>
        {markdown && !isLoading && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 px-3 py-1 bg-slate-600 text-slate-200 text-xs font-semibold rounded hover:bg-slate-500 transition-colors"
          >
            {copyButtonText}
          </button>
        )}
      </div>
    </div>
  );
};
