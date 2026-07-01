import { Module } from '@nestjs/common';
import { DesignerModule } from './modules/desginer/desginer.module';
import { ReviewerModule } from './modules/reviewer/reviewer.module';

@Module({
  controllers: [],
  imports: [DesignerModule, ReviewerModule],
  providers: []
})
export class AppModule {}
