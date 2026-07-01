import { Module } from '@nestjs/common';
import { DesignerController } from './desginer.controller';
import { DesignerService } from './desginer.service';

@Module({
  controllers: [DesignerController],
  imports: [],
  providers: [DesignerService]
})
export class DesignerModule {}
