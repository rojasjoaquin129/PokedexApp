import { loginFail, loginSuccess, logOut } from '../actions/auth.actions';
import { Auth } from '../models/auth.models';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: Auth | null;
  // error message
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { email, token }) => {
    return {
      ...state,
      isAuthenticated: true,
      user: { token: token, email: email },
    };
  }),
  on(loginFail, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: 'No es correcto el email',
    };
  }),

  on(logOut, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  })
);
