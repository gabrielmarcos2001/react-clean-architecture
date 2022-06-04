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
   * Returns a fake movie id
   * @param movie 
   * @returns 
   */
  create(movie: MovieDataModel): Promise<string> {
    return new Promise((resolve): void => {
      resolve("1");
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