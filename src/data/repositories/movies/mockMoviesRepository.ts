import { injectable } from "inversify";
import { MovieDataModel } from "../../models/movie";
import { IMoviesRepository } from "./movies";

@injectable()
export class MockMoviesRepository implements IMoviesRepository {

  /**
   * Returns a mock array with a list of movies
   * @returns 
   */
  fetch(): Promise<MovieDataModel[]> {
    return new Promise((resolve): void => {
      const mockResponse = [{
        id: "1",
        title: "movie 1",
        rating: 2,
        category: 3,
      },
      {
        id: "2",
        title: "movie 2",
        rating: 4,
        category: 1,
      }];
      resolve(mockResponse);
    });
  }

  /**
   * Returns a moke movie model object
   * @param title 
   * @param category 
   * @param rating 
   * @returns 
   */
  create(title: string, category: number, rating: number): Promise<MovieDataModel> {
    return new Promise((resolve): void => {
      resolve({
        id: '1',
        title,
        rating,
        category
      });
    });
  }

  /**
   * Updates the movie
   * @param id 
   * @param movie 
   */
  update(id: string, movie: MovieDataModel): Promise<MovieDataModel> {
    return new Promise((resolve): void => {
      resolve(movie);
    });
  }
}