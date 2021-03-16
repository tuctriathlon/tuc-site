import {createAction, props} from '@ngrx/store';

export const login = createAction('login', props<{token: string}>());
export const logout = createAction('logout');
