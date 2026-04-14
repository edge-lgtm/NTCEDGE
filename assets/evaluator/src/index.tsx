import React from 'react';
import { createRoot } from 'react-dom/client';
import { EvaluatorApp } from './EvaluatorApp';

const container = document.getElementById('evaluator-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <EvaluatorApp />
    </React.StrictMode>
  );
}
