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
   * Returns an array with the list of saved movies
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
   * Creates a new Movie object and returns its data
   * @param title 
   * @param category 
   * @param rating 
   * @returns 
   */
  async create(title: string, category: number, rating: number): Promise<MovieDataModel> {
    const moviesRef = collection(db, 'movies')
    const movie: MovieDataModel = {
      title,
      rating,
      category,
    }
    const result = await addDoc(moviesRef, movieConverter.toFirestore(movie));
    movie.id = result.id;
    return movie;
  }

  /**
   * Updates the movie information
   * @param id 
   * @param movie 
   */
  async update(id: string, movie: MovieDataModel): Promise<MovieDataModel> {
    const movieRef = doc(db, 'movies', id);
    await updateDoc(movieRef, movieConverter.toFirestore(movie));
    return movie;
  }
}