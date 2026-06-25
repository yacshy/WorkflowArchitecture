import { Router, Request, Response } from 'express';
import { config } from '../config';
import { knowledgeService } from '../knowledge/loader';
import { evaluate } from '../agents/evaluator';
import { design } from '../agents/designer';
import { extend } from '../agents/extender';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    model: config.ollamaModel,
    knowledgeEntries: knowledgeService.getEntries().length,
  });
});

// Get current model info
router.get('/model', (_req: Request, res: Response) => {
  res.json({
    baseUrl: config.ollamaBaseUrl,
    model: config.ollamaModel,
  });
});

// Get knowledge base summary
router.get('/knowledge', (_req: Request, res: Response) => {
  const entries = knowledgeService.getEntries();
  res.json({
    total: entries.length,
    entries: entries.map(e => ({
      title: e.title,
      source: e.source,
      contentLength: e.content.length,
    })),
  });
});

// Reload knowledge base
router.post('/knowledge/reload', async (_req: Request, res: Response) => {
  try {
    await knowledgeService.reload();
    res.json({
      success: true,
      entries: knowledgeService.getEntries().length,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to reload knowledge',
    });
  }
});

// Agent 1: Evaluate project compliance
router.post('/evaluate', async (req: Request, res: Response) => {
  try {
    const { projectPath, requirement } = req.body;

    if (!projectPath) {
      res.status(400).json({ success: false, error: 'projectPath is required' });
      return;
    }

    const result = await evaluate(projectPath, requirement);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Evaluation failed',
    });
  }
});

// Agent 2: Architecture design from scratch
router.post('/design', async (req: Request, res: Response) => {
  try {
    const { requirement, context } = req.body;

    if (!requirement) {
      res.status(400).json({ success: false, error: 'requirement is required' });
      return;
    }

    const result = await design(requirement, context);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Design failed',
    });
  }
});

// Agent 3: Minimal-change extension
router.post('/extend', async (req: Request, res: Response) => {
  try {
    const { projectPath, newRequirement } = req.body;

    if (!projectPath || !newRequirement) {
      res.status(400).json({
        success: false,
        error: 'projectPath and newRequirement are required',
      });
      return;
    }

    const result = await extend(projectPath, newRequirement);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Extension design failed',
    });
  }
});

export default router;