import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppState } from 'src/app/core/state/app.state';
import { loginStart } from 'src/app/core/state/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    public store: Store<AppState>
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  rellenar() {
    this.form.setValue({
      user: 'master@certant.com',
      password: 'password',
    });
  }
  login() {
    if (this.form.invalid) {
      this.form.reset();
    } else {
      const { user, password } = this.form.value;
      this.store.dispatch(loginStart({ email: user, password: password }));
    }
  }

  isValidField(field: string) {
    return (
      (this.form.get(field)?.touched || this.form.get(field)?.dirty) &&
      !this.form.get(field)?.valid
    );
  }

  getErrorMessage(field: string) {
    let message;
    if (this.form.get(field)?.errors?.['required']) {
      message = 'El campo ' + field + ' no puede estar vacio';
    } else if (this.form.get(field)?.hasError('email')) {
      message = 'No es un formato valido de email ';
    } else if (this.form.get(field)?.hasError('minlength')) {
      const minLength =
        this.form.get(field)?.errors?.['minlength'].requieredLength;
      message = 'La contraseña tiene q tener mas de 6 caracteres';
    }
    return message;
  }
  ngOnInit(): void {}
}
