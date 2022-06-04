import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { moviesUsecases } from './domain/usecases/movies';
import MovieList from './presentation/scenes/list/moviesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">React App - Clean Architecture</header>
      <MovieList></MovieList>
    </div>
  );
}

export default App;
