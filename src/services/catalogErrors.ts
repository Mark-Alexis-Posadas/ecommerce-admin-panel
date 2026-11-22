import axios from 'axios';
export interface CatalogFailure {
    message: string;
    errors?: Record<string, string[]>;
}
export function catalogFailure(error: unknown): CatalogFailure { return axios.isAxiosError<CatalogFailure>(error) ? error.response?.data || { message: 'Request failed' } : { message: 'Request failed' }; }
