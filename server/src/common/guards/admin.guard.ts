import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // console.log('AdminGuard - User:', user);

    if (!user || user.isAdmin !== true) {
      throw new ForbiddenException('Access denied only Admins');
    }

    return true;
  }
}
