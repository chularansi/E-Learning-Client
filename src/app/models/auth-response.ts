export interface AuthResponse {
  token: string;
  refreshToken: string;
  username?: string;
  roles?: string[];
  is2StepVerificationRequired?: boolean;
  provider?: string;
}
