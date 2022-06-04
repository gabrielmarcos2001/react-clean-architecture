import { MovieDataModel } from "../../data/models/movie";
import { IMoviesRepository, TYPES } from "../../data/repositories/movies/movies";
import { repositoryContainer } from "../../inversify/config";
import { movieConverter, MovieModel } from "../models/movie";

export interface MoviesUseCases {
  getAll(): Promise<MovieModel[]>;
  get(id: string): Promise<MovieModel | null>;
  create(movie: MovieModel): Promise<string>;
  update(movie: MovieModel): Promise<MovieModel>;
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
  async getAll(): Promise<MovieModel[]> {
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
  async get(id: string): Promise<MovieModel | null> {
    throw new Error("Method not implemented.");
  }

  // Adds a new movie
  async create(movie: MovieModel): Promise<string> {
    return await this._repository.create(movieConverter.toDataModel(movie));
  }

  // Updates an existing movie
  async update(movie: MovieModel): Promise<MovieModel> {
    await this._repository.update(movie.id, movieConverter.toDataModel(movie));
    return movie;
  }
}

// Movie usecases instances - Repository gets injected
export const moviesUsecases = new MoviesUseCasesImp(repositoryContainer.get<IMoviesRepository>(TYPES.IMoviesRepository));