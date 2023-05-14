import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    async canActivate(
        context: ExecutionContext,
    ) {
    const request = context.switchToHttp().getRequest();
    try {
        const token = request.cookies['token'];
        const {scope} = await this.jwtService.verify(token)
        const is_ambassador= request.path.toString().indexOf('api/ambassador') >=0
        return is_ambassador && scope ==='abmassador' || !is_ambassador && scope === 'admin'
    } catch (error) {
        return false 
    }
  }}