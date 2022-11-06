import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.auth';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }), 
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
