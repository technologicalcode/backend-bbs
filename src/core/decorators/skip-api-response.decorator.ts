import { SetMetadata } from '@nestjs/common';
import { SKIP_API_RESPONSE_KEY } from '../constants';

export const SkipApiResponse = () => SetMetadata(SKIP_API_RESPONSE_KEY, true);
