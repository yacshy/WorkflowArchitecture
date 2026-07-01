import { Controller } from '@nestjs/common';
import { DesignerService } from './desginer.service';

@Controller('design')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}
}
