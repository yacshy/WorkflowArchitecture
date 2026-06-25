import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { config } from '../config';

class LlmService {
  private model: ChatOllama;

  constructor() {
    this.model = new ChatOllama({
      baseUrl: config.ollamaBaseUrl,
      model: config.ollamaModel,
      temperature: 0.1,
    });
  }

  async invoke(systemPrompt: string, userMessage: string): Promise<string> {
    const response = await this.model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userMessage),
    ]);
    return response.content.toString();
  }
}

export const llmService = new LlmService();