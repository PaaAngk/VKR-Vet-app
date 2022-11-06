import { User } from './../users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: User): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
