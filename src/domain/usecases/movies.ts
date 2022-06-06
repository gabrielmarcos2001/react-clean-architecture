import { MovieDataModel } from "../../data/models/movie";
import { IMoviesRepository, TYPES } from "../../data/repositories/movies/movies";
import { repositoryContainer } from "../../inversify/config";
import { movieConverter, Movie } from "../models/movie";

export interface MoviesUseCases {
  getAll(): Promise<Movie[]>;
  get(id: string): Promise<Movie | null>;
  create(title: string, category: number, rating: number): Promise<Movie>;
  update(movie: Movie): Promise<Movie>;
}

/**
 * Domain use cases for Movies
 */
export class MoviesUseCasesImp implements MoviesUseCases {
  private _repository: IMoviesRepository;
  public constructor(repository: IMoviesRepository) {
    this._repository = repository;
  }

  /**
   * Get all movies
   * @returns 
   */
  async getAll(): Promise<Movie[]> {
    const movies = await this._repository?.fetch();

    const result = movies.map((movie: MovieDataModel) => {
      return movieConverter.fromDataModel(movie);
    })
    return result;
  }

  /**
   * Get a movie by its id
   * @param id 
   */
  async get(id: string): Promise<Movie | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Creates a new movie and returns the movie object with its id
   * @param title 
   * @param category 
   * @param rating 
   * @returns 
   */
  async create(title: string, category: number, rating: number): Promise<Movie> {
    const movieModel = await this._repository.create(title, category, rating);
    return movieConverter.fromDataModel(movieModel);
  }

  /**
   * Updates the movie information
   * @param movie 
   * @returns 
   */
  async update(movie: Movie): Promise<Movie> {
    await this._repository.update(movie.id, movieConverter.toDataModel(movie));
    return movie;
  }
}

// Movie usecases instances - Repository gets injected
export const moviesUsecases = new MoviesUseCasesImp(repositoryContainer.get<IMoviesRepository>(TYPES.IMoviesRepository));