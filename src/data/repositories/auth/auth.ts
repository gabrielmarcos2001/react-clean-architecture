export interface IAuthRepository {
  auth(): Promise<void>;
}