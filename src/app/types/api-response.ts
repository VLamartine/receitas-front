interface ApiResponseMetadata {
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T[];
  metadata: ApiResponseMetadata;
}
