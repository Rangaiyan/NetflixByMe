import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any; // payload will be attached here
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token missing or invalid');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Assign whole payload (includes isAdmin)
    } catch (e) {
      Logger.error(e.message);
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;

    const [bearer, token] = authHeader.split(' ');
    return bearer === 'Bearer' ? token : undefined;
  }
}
