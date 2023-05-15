import {  Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';
@Module({
    imports:[JwtModule.register({ secret: 'secret', signOptions:{expiresIn:'1d'} }), CacheModule.register({
        store: redisStore as any,
        host: 'redis',
        port: 6379,
    })],
    exports:[JwtModule, CacheModule]
})
export class SharedModule {}
