import { LoginResponse } from '../types/LoginResponse';
import { User } from '../types/User';
import { client } from './fetchClient';

export const loginUser = (
  email: string,
  password: string,
) => {
  return client.post<LoginResponse>(
    'login', { email, password },
  );
};

export const registerUser = (
  email: string,
  password: string,
) => {
  return client.post<User>(
    'registration', { email, password },
  );
};

export const activateUser = (activationToken: string) => {
  return client.get<LoginResponse>(`activation/${activationToken}`);
};
