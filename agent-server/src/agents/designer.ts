import { llmService } from '../services/llm-service';
import { knowledgeService } from '../knowledge/loader';
import { SYSTEM_PROMPT } from '../prompts/designer.prompt';
import { AgentResponse } from '../types';

export async function design(
  requirement: string,
  context?: string,
): Promise<AgentResponse> {
  try {
    // Prepare context from knowledge base
    const knowledgeContext = knowledgeService.getKnowledgeSummary();

    // Build the user message
    let userMessage = `# Architecture Design Request\n\n`;
    userMessage += `## Requirement\n${requirement}\n\n`;

    if (context) {
      userMessage += `## Additional Context\n${context}\n\n`;
    }

    // Include knowledge base for reference
    userMessage += `\n## Reference Knowledge\n${knowledgeContext}`;

    // Invoke LLM
    const result = await llmService.invoke(SYSTEM_PROMPT, userMessage);

    return {
      success: true,
      result,
    };
  } catch (err: any) {
    return {
      success: false,
      result: '',
      error: err.message || 'Unknown error during design',
    };
  }
}