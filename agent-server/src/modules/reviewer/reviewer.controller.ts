import { Controller } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';

@Controller('review')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) {}
}
