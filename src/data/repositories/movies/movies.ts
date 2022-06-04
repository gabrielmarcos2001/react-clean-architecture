import { MovieDataModel } from "../../models/movie";

export interface IMoviesRepository {
  fetch(): Promise<MovieDataModel[]>;
  create(movie: MovieDataModel): Promise<string>;
  update(id: string, movie: MovieDataModel): Promise<MovieDataModel>;
}

const TYPES = {
  IMoviesRepository: Symbol.for("IMoviesRepository")
};

export { TYPES };