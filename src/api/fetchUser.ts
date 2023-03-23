import { User } from '../types/User';
import { client } from './fetchClient';

export const loginUser = (
  email: string,
  password: string,
) => {
  return client.post<User>(
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
  return client.get(`activation/${activationToken}`);
};

