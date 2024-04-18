import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CatsModule],
})
export class AppModule implements NestModule {
  // configure method can also by async
  // you can await completion of an async op inside the configure method body
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer
      .apply(LoggerMiddleware)
      // .exclude({
      //   path: 'cats',
      //   method: RequestMethod.POST,
      // })
      .forRoutes(CatsController);
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
