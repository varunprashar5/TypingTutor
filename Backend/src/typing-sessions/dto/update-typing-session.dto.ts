import { PartialType } from '@nestjs/swagger';
import { CreateTypingSessionDto } from './create-typing-session.dto';

export class UpdateTypingSessionDto extends PartialType(
  CreateTypingSessionDto,
) {}
