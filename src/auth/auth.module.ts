import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
