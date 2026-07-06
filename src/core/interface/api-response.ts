export interface ApiResponse<T = unknown> {
  state: boolean;
  message: string;
  data: T;
}

export function ok<T>(data: T, message = 'Operación exitosa'): ApiResponse<T> {
  return { state: true, message, data };
}

export function fail<T = null>(
  message: string,
  data: T = null as T,
): ApiResponse<T> {
  return { state: false, message, data };
}

export function isApiResponse(value: unknown): value is ApiResponse {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  const hasState =
    typeof record.state === 'boolean' || typeof record.status === 'boolean';
  const hasMessage =
    typeof record.message === 'string' || record.message === null;
  const hasData = 'data' in record;

  return hasState && hasMessage && hasData;
}

export function normalizeApiResponse<T = unknown>(
  value: unknown,
  defaultMessage = 'Operación exitosa',
): ApiResponse<T> {
  if (isApiResponse(value)) {
    const record = value as unknown as Record<string, unknown>;
    return {
      state: Boolean(record.state ?? record.status),
      message: String(record.message ?? defaultMessage),
      data: (record.data ?? null) as T,
    };
  }

  if (value === undefined) {
    return { state: true, message: defaultMessage, data: null as T };
  }

  return { state: true, message: defaultMessage, data: value as T };
}
