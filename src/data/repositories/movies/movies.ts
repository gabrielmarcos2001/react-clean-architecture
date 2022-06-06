import { MovieDataModel } from "../../models/movie";

export interface IMoviesRepository {
  fetch(): Promise<MovieDataModel[]>;
  create(title: string, category: number, rating: number): Promise<MovieDataModel>;
  update(id: string, movie: MovieDataModel): Promise<MovieDataModel>;
}

const TYPES = {
  IMoviesRepository: Symbol.for("IMoviesRepository")
};

export { TYPES };