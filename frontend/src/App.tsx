
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QueryInput } from './components/QueryInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { postPrompt } from './services/back-end.api';
import { ResultMarkdown } from './components/ResultMarkdown';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('Total pago com PIX nos últimos 30 dias');
  const [mongoQuery, setMongoQuery] = useState<string>('');
  const [markDown, setMarkDown] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const msgError = 'Ocorreu um erro ao gerar a query. Verifique o console para mais detalhes.';

  const handleGenerateQuery = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Por favor, insira uma regra de elegibilidade.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMongoQuery('');
    setMarkDown('');

    try {
      const result = await postPrompt(userInput);

      if (!result.answer || !result.query) {
        setError(msgError);
        return;
      }
      setMongoQuery(result.query.replaceAll("'", '"'));
      setMarkDown(result.answer)
    } catch (err) {
      console.error(err);
      setError(msgError);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Header />

        <div className="mt-8">
          <QueryInput value={userInput} onChange={setUserInput} />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGenerateQuery}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader />
                Gerando...
              </>
            ) : (
              <>
                Gerar Pipeline
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-8">
          <ResultDisplay query={mongoQuery} isLoading={isLoading} />
        </div>
        <div className="mt-8">
          <ResultMarkdown markdown={markDown} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;

