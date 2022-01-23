import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from './reducers/auth.reducers';

export interface AppState {
  authState: AuthState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  authState: AuthReducer,
};
