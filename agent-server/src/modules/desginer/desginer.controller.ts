import { Controller, Get } from '@nestjs/common';
import { DesignerService } from './desginer.service';
import { Ollama } from '@langchain/ollama';

@Controller('designer')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}

  @Get('/')
  async getHello(): Promise<string> {
    const model = new Ollama({
      model: 'qwen2.5-coder:14b',
      baseUrl: 'http://localhost:11434'
    });
    const content = await model.invoke('你好');
    return content;
  }
}
