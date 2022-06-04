import { IAuthRepository } from "./auth";
import { getAuth, signInAnonymously} from "firebase/auth";
import { app } from "../../services/firestore";

class FirebaseAuthRepository implements IAuthRepository {
  auth(): Promise<void> {
    return new Promise((resolve): void => {
      const userCredentials = signInAnonymously(getAuth(app));
      console.log(userCredentials);

      // TODO: Return object with credentials
      resolve();
    });
  }
}

export const firebaseAuthRepository = new FirebaseAuthRepository();