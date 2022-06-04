import { IAuthRepository } from "./auth";

class FirebaseAuthRepository implements IAuthRepository {
  auth(): Promise<void> {
    return new Promise((resolve): void => {
      resolve();
    });
  }
}

export const mockAuthRepository = new FirebaseAuthRepository();