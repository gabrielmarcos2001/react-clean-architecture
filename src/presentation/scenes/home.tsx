import { useEffect, useState } from "react";
import { Movie } from "../../domain/models/movie";
import { moviesUsecases } from '../../domain/usecases/movies';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { AppSnackBar, SeverityValues } from "../components/appSnackBar";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useNavBarDispatch } from "../state";
import VirtualizedList from "../components/moviesList";

function Home(props: any) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({show: false, message: '', severity: "success"});
  
  const { t } = useTranslation();
  
  const navigate = useNavigate();

  const navBarDispatch = useNavBarDispatch();
  
  useEffect(() => {

    // Updates the Context state of the Nav Bar
    navBarDispatch({isRoot: true });

    // Required for using async - await in useEffect
    const fetchData = async () => {
      // Requests the list of movies to the movies usecases object
      const movies = await moviesUsecases.getAll();
      return movies;
    };

    fetchData().then((movies: Movie[]) => {
      setLoading(false);
      setMovies(movies);
    }).catch(err => {
      setLoading(false);
      setSnackbar({show: true, message: `There was an error loading movies: ${err}`, severity: "error"});
    });
  },[navBarDispatch]);

  return (
    <Stack alignItems="center" margin={8} textAlign="center">
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <Stack spacing={'24px'} alignItems="center" sx={{ width: '50%' }}>
          <Typography variant="h5">{t('home_title')}</Typography>
          <div id='header'>
            <Grid container sx={{margin: '12px', display: `${loading ? 'visible': 'none'}`}}>
              <Grid item sx={{width: '80%'}}>
                <p>{t('loading_movies')}</p>
              </Grid>
              <Grid item sx={{width: '20%'}}>
                <CircularProgress />
              </Grid>
            </Grid> 
            <Typography display={loading ? 'none' : 'visible'}>{movies.length === 0? t('empty_movies_list') : t('movie_list_header', { count: movies.length })}</Typography>
            <Button variant="contained" onClick={()=> navigate('/create')} sx={{margin:'16px'}}>{t('add_movie')}</Button>
          </div>
          <VirtualizedList movies={movies}></VirtualizedList>
        </Stack>
      </Box>
      <AppSnackBar open={snackbar.show} width={"50%"} message={snackbar.message} severity={snackbar.severity as SeverityValues}></AppSnackBar> 
    </Stack>
  );
}

export default Home;