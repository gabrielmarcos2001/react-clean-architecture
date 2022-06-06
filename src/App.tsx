import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './presentation/components/navbar';
import MovieCreate from './presentation/scenes/createMovie';
import Home from './presentation/scenes/home';
import { NavBarProvider } from './presentation/state';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E33E7F'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBarProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<MovieCreate/>} />
        </Routes>
      </NavBarProvider>
    </ThemeProvider>
  );
}

export default App;
