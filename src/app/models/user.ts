export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
  clientURI: string;
}

export interface ResetPassword {
  password: string;
  email: string;
  token: string;
}

export interface TwoFactor {
  email: string;
  provider: string;
  token: string;
}
