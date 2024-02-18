export interface InputSignIn {
  email?: string;
  password?: string;
}

export interface InputSignUp extends InputSignIn {
  firstName?: string;
  lastName?: string;
}
