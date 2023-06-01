import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
// import { PostsModule } from 'src/posts/posts.module';
import config from 'src/common/configs/config';
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { ClientModule } from './clients/clients.module';
import { PetsModule } from './pets/pets.module';
import { ReceptionModule } from './reception/reception.module';
import AdminModule from './adminJS.module';
import { AnalyzesResearchModule } from './analyzes-research/analyzes-research.module';
import { ServiceModule } from './services/services.module';
import { GoodsModule } from './goods/goods.module';
import { EmployeeModule } from './employee/employee.module';
import { PrintModule } from './printed/print.module';
import { ReceptionRecordModule } from './receptionRecord/receptionRecord.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WorkScheduleModule } from './work-schedule/workSchedule.module';
// import { AnalyzesResearchModule } from './analyzes-research/analyzes-research.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))],
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AdminModule,

    AuthModule,
    UsersModule,
    ClientModule,
    PetsModule,
    ReceptionModule,
    AnalyzesResearchModule,
    ServiceModule,
    GoodsModule,
    EmployeeModule,
    PrintModule,
    ReceptionRecordModule,
    AnalyticsModule,
    WorkScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
