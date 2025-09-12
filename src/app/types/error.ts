export type ErrorGeneric = {
  statusCode: number;
  error: string;
};
export type FormError = ErrorGeneric & {
  [key: string]: string[];
};
