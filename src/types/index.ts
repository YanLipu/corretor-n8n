export interface FormData {
  nome: string;
  email: string;
  descricao: string;
}

export interface ApiResponse {
  status: number;
  message: string;
}

export type ViewState = 'idle' | 'loading' | 'success_200' | 'success_202' | 'error';