import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core';
// import { MatButtonModule } from '@angular/material/button';
// import { FuseCardModule } from '@fuse/components/card';
// import { SharedModule } from 'app/shared/shared.module';
import { AuthSignOutComponent } from './sign-out.component';
import { authSignOutRoutes } from './sign-out.routing';

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        TuiLinkModule,
    ]
})
export class AuthSignOutModule
{
}
