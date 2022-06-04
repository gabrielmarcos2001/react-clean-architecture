import { addDoc, collection, doc, DocumentSnapshot, getDocs, updateDoc } from "firebase/firestore";
import { MovieDataModel } from "../../models/movie";
import { db } from "../../services/firestore";
import { IMoviesRepository } from "./movies";
import { injectable } from "inversify";

/**
 * Converts model data to firestore
 */
const movieConverter = {
  toFirestore: (movie: MovieDataModel) => {
    return {
      title: movie.title,
      rating: movie.rating,
      category: movie.category,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot) => {
    const data = snapshot.data();
    const result: MovieDataModel = {
      id: snapshot.id,
      title: data?.title || '',
      rating: data?.rating || 0, 
      category: data?.category || 0,
    }
    return result;
  }
};

@injectable()
export class FirebaseMoviesRepository implements IMoviesRepository {

  /**
   * Returns a mock array with a list of movies
   * @returns 
   */
  async fetch(): Promise<MovieDataModel[]> {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const result: MovieDataModel[] = [];
    querySnapshot.forEach((doc) => {
      result.push(movieConverter.fromFirestore(doc));
    });
    return result;
  }

  /**
   * Returns a fake movie id
   * @param movie 
   * @returns 
   */
  async create(movie: MovieDataModel): Promise<string> {
    const moviesRef = collection(db, 'movies')
    const result = await addDoc(moviesRef, movieConverter.toFirestore(movie));
    return result.id;
  }

  /**
   * Updates the movie
   * @param id 
   * @param movie 
   */
  async update(id: string, movie: MovieDataModel): Promise<MovieDataModel> {
    const movieRef = doc(db, 'movies', id);
    await updateDoc(movieRef, movieConverter.toFirestore(movie));
    return movie;
  }
}