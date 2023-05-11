import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<any> | Observable<any> | any {
    const request = context.switchToHttp().getRequest();
    try {
        const token = request.cookies['token'];
        return this.jwtService.verify(token)
    } catch (error) {
        return false 
    }
  }}