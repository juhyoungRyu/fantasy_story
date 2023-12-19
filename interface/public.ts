export type User = { id: string; pw: string; name: string };

export interface DefaultReturn {
  success: boolean;
  data: any;
  error?: {
    code?: string;
    message?: string;
  };
}
