/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://gadgets-catalog.onrender.com/';

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class AuthError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'ValidationError';
  }
}

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  const res = await fetch(BASE_URL + url, options);

  if (res.status === 401) {
    throw new AuthError();
  }

  if (res.status === 400) {
    throw new ValidationError();
  }

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const resonseBody = await res.json();

  return resonseBody;
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
