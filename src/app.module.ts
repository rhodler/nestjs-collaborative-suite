import { Module } from '@nestjs/common';

import { ControllerModule } from 'src/controllers/controller.module';
import { DatabaseModule } from 'src/infrastructure/persistence/database.module';

@Module({
  imports: [
    ControllerModule,
    DatabaseModule.register({ global: true, type: 'prisma' }),
  ],
})
export class AppModule {}
