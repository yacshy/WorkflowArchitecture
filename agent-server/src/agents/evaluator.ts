import { llmService } from '../services/llm-service';
import { projectReaderService } from '../services/project-reader';
import { knowledgeService } from '../knowledge/loader';
import { SYSTEM_PROMPT } from '../prompts/evaluator.prompt';
import { AgentResponse } from '../types';

export async function evaluate(
  projectPath: string,
  requirement?: string,
): Promise<AgentResponse> {
  try {
    // Read the project
    const projectStructure = await projectReaderService.readProject(projectPath);

    // Prepare context from knowledge base
    const knowledgeContext = knowledgeService.getKnowledgeSummary();

    // Build the user message with project info and knowledge
    let userMessage = `# Project to Evaluate\n\n`;
    userMessage += `## Project Structure\n\`\`\`\n${projectStructure.tree}\n\`\`\`\n\n`;
    userMessage += `## Project Summary\n${projectStructure.summary}\n\n`;

    // List each file with its content
    userMessage += `## Source Files\n\n`;
    for (const file of projectStructure.files) {
      userMessage += `### ${file.path}\n\`\`\`${file.language}\n${file.content}\n\`\`\`\n\n`;
    }

    if (requirement) {
      userMessage += `## Additional Context\n${requirement}\n\n`;
    }

    // Include knowledge base
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
      error: err.message || 'Unknown error during evaluation',
    };
  }
}