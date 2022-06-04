import { useEffect, useState } from "react";
import { MovieModel } from "../../../domain/models/movie";
import { moviesUsecases } from '../../../domain/usecases/movies';
import MovieListItem from "../../components/movieListItem";

function MovieList(props: any) {
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    // Required for using async - await in useEffect
    const fetchData = async () => {
      // Requests the list of movies to the movies usecases object
      const movies = await moviesUsecases.getAll();
      return movies;
    };

    fetchData().then((movies: MovieModel[]) => {
      setMovies(movies);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  //const movieElement = movies.map((movie, i) => <div key={i}>{movie.title}</div>);
  const movieElement = movies.map((movie, i) => MovieListItem({movie}));

  return (
    <div>
      <header>
        <h1>Welcome to the Movies List App!</h1>
      </header>
      <div className="movies-container">
        <div>{movieElement}</div>
      </div>
    </div>
  );
}

export default MovieList;