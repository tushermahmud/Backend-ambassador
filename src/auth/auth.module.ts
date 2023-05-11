import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.register({ secret: 'secret', signOptions:{expiresIn:'1d'} })],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
