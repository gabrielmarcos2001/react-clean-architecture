import { Container } from "inversify";
import { MockMoviesRepository } from "../data/repositories/movies/mockMoviesRepository";
import { IMoviesRepository, TYPES } from "../data/repositories/movies/movies";

const repositoryContainer = new Container();
repositoryContainer.bind<IMoviesRepository>(TYPES.IMoviesRepository).to(MockMoviesRepository);

export { repositoryContainer };