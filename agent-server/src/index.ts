import express from 'express';
import cors from 'cors';
import { config } from './config';
import { knowledgeService } from './knowledge/loader';
import apiRouter from './routes/api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', apiRouter);

// Start server
async function start() {
  // Load knowledge base
  await knowledgeService.loadAll();

  app.listen(config.port, () => {
    console.log(`\n========================================`);
    console.log(`  Workflow Architecture Agent Service`);
    console.log(`========================================`);
    console.log(`  Model:     ${config.ollamaModel}`);
    console.log(`  Ollama:    ${config.ollamaBaseUrl}`);
    console.log(`  Port:      ${config.port}`);
    console.log(`----------------------------------------`);
    console.log(`  API Endpoints:`);
    console.log(`  GET  /api/health           Health check`);
    console.log(`  GET  /api/model            Model info`);
    console.log(`  GET  /api/knowledge        Knowledge base`);
    console.log(`  POST /api/knowledge/reload Reload knowledge`);
    console.log(`  POST /api/evaluate         Evaluate project compliance`);
    console.log(`  POST /api/design           Architecture design`);
    console.log(`  POST /api/extend           Minimal-change extension`);
    console.log(`========================================\n`);
  });
}

start().catch(console.error);