import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignerModule } from './modules/desginer/desginer.module';
import { ReviewerModule } from './modules/reviewer/reviewer.module';

@Module({
  controllers: [AppController],
  imports: [DesignerModule, ReviewerModule],
  providers: [AppService]
})
export class AppModule {}
