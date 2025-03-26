import { SummaryRequest, SummaryResponse } from '@shared/schema';
import { apiRequest } from './queryClient';

export async function generateSummary(data: SummaryRequest): Promise<SummaryResponse> {
  const response = await apiRequest('POST', '/api/summarize', data);
  return response.json();
}

export async function validateYoutubeUrl(youtubeUrl: string): Promise<{ valid: boolean, message?: string }> {
  const response = await apiRequest('POST', '/api/validate-youtube', { youtubeUrl });
  return response.json();
}
