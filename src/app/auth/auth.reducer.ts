import {Action, createReducer, on} from '@ngrx/store';
import {login, logout} from './auth.actions';
import {UserModel} from './user.model';

interface AuthState {
  token?: null | string;
  currentUser?: UserModel | null;
}

export const initialState: AuthState = {
  token: null,
  currentUser: null
};
const reducer = createReducer(
  initialState,
  on(login, (state: AuthState, {token}) => ({token})),
  on(logout, (_: AuthState) => ({currentUser: null, token: null}))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
