export interface ApiResponse{
    status: 'success' | 'error';
    message: string | null;
    data: any[]|{}| null;
}