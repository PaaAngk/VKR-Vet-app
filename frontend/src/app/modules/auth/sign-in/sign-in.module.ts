import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { authSignInRoutes } from './sign-in.routing';
import { TuiInputModule, TuiInputPasswordModule, TuiFilterByInputPipeModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule, TuiErrorModule, TuiLoaderModule, TuiNotificationModule } from '@taiga-ui/core';
@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        RouterModule.forChild(authSignInRoutes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        TuiInputModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
        TuiFilterByInputPipeModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiFieldErrorPipeModule,
        TuiLoaderModule,
        TuiNotificationModule,
    ]
})
export class AuthSignInModule
{
}
