import axios from 'axios';
export class AdminAccessError extends Error {
  constructor() {
    super('Admin access required');
    this.name = 'AdminAccessError';
  }
}
export function adminLoginError(error: unknown): string {
  if (error instanceof AdminAccessError)
    return 'This account does not have administrator access. Ask an authorized operator to provision it.';
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return 'Cannot reach the authentication server. Check that the backend is running and its API URL and CORS settings are correct.';
    if (error.response.status === 401) return 'Incorrect email or password.';
    if (error.response.status === 403) return 'This account does not have administrator access.';
    if (error.response.status >= 500)
      return 'The authentication server is unavailable. Please try again.';
  }
  return 'Unable to sign in. Please try again.';
}
