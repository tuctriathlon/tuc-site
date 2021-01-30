import {createAction, props} from '@ngrx/store';
import {UserModel} from './user.model';

export const login = createAction('login', props<{currentUser: UserModel}>());
export const logout = createAction('logout');
