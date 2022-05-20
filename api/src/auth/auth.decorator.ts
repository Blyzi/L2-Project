import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
export function Auth(...roles) {
  return applyDecorators(SetMetadata('claims', roles), UseGuards(AuthGuard));
}
