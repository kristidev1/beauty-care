import {User} from 'models';

export type AuthReducer = {
  user: User | undefined;
  token: string | undefined;
};
