
import React from 'react';
import { MongoIcon } from './icons/MongoIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Gerador de Query MongoDB
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Escreva uma regra de negócio em linguagem natural e obtenha um pipeline <code className="bg-slate-700 text-brand-primary rounded-md px-1 py-0.5 text-base">aggregate</code> do MongoDB.
      </p>
    </header>
  );
};
