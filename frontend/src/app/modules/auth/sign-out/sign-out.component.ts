import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-out',
    templateUrl  : './sign-out.component.html',
    styleUrls: ['./sign-out.component.less']
})
export class AuthSignOutComponent implements OnInit
{
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    ngOnInit(): void
    {
        // Sign out
        this._authService.purgeAuth();

        // Redirect after the countdown
        timer(1000, 1000)
            .pipe(
                finalize(() => {
                    this._router.navigate(['sign-in']);
                })
            )
            .subscribe();
    }

}
