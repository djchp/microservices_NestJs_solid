import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, tap } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject('AUTH') private authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authentication = this.getAuth(context)
        return this.authClient.send('validate_user', {
            Authentication: authentication,
        }).pipe(
            tap((res) => {
                this.addUser(res,context)
            }),
            catchError(() => {
                throw new UnauthorizedException('')
            })
        )
    }

    private getAuth(context: ExecutionContext) {
        let authentication: string;
        if (context.getType() === "http") {
            authentication= context.switchToHttp().getRequest().cookies?.Authentication
        } else if (context.getType() === "rpc") {
            authentication = context.switchToRpc().getData().Authentication
        }
        if (!authentication) {
            throw new UnauthorizedException('Auth failure')
        }
        return authentication
    }

    private addUser(user: any, context: ExecutionContext) {
        if (context.getType() === "http") {
            context.switchToHttp().getRequest().user = user.name
        } else if (context.getType() === "rpc") {
            context.switchToRpc().getData().user = user.name
        }
    }
}