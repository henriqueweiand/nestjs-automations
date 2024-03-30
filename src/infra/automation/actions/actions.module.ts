import { Module } from '@nestjs/common';

import CreatedProductAction from './product.created';

@Module({
  providers: [
    CreatedProductAction,
  ],
  exports: [
    CreatedProductAction
  ],
})
export class ActionsModule { }
