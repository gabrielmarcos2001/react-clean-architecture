import { Autocomplete, Box, Button, CircularProgress, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { getCategoryName, Movie } from "../../domain/models/movie";
import { moviesUsecases } from "../../domain/usecases/movies";
import { AppSnackBar, SeverityValues } from "../components/appSnackBar";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { useNavBarDispatch } from "../state";

function MovieCreate(props: any) {
  const [movieData, setMovieData] = useState({title: '', category: 0, rating: 0});
  const [snackbar, setSnackbar] = useState({show: false, message: '', severity: "success"});
  const [loading, setLoading] = useState(false);
  const [fromValidations, setFormValidations] = useState({titleError: '', categoryError: ''});

  const navBarDispatch = useNavBarDispatch();
  
  const { t } = useTranslation();

  const categories = [
    { label: getCategoryName(1), id: 1 },
    { label: getCategoryName(2), id: 2 },
  ];

  useEffect(() => {
    // Updates the Context state of the Nav Bar
    navBarDispatch({isRoot: false });
  });

  /**
   * Validates the input form
   * @returns 
   */
  function validateForm(): boolean {
    let valid = true;

    let titleError = '';
    let categoryError = '';

    if (movieData.title === '') {
      titleError = t('error_movie_title_mandatory');
      valid = false;
    }

    if (movieData.category === 0) {
      categoryError = t('error_movie_category_mandatory');
      valid = false;
    }

    setFormValidations({titleError, categoryError});
    return valid;
  }

  /**
   * Save Movie button was clicked
   * @returns 
   */
  function saveMovie() {
    const saveData = async () => {
      const movie = await moviesUsecases.create(movieData.title, movieData.category, movieData.rating);
      return movie;
    };

    // validates the input form
    if (!validateForm()) return;
    
    // Updates the state of the loader / save button
    setLoading(true);

    // calls the function which runs the usecase
    saveData().then((movie: Movie) => {
      
      // Displays a snackbar with the confirmation message
      setSnackbar({show: true, message: t('create_movie_success', { movieId: movie.id }), severity: "success"});

      // Updates the state of the loader / save button
      setLoading(false);

      setMovieData({title: '', category: 0, rating: 0});

    }).catch((err) => {

      // Displays a snackbar with an error message
      setSnackbar({show: true, message: t('create_movie_error', { error: err }), severity: "error"});

      // Updates the state of the loader
      setLoading(false);
    })
  }

  return (
    <Stack alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" sx={{ width: '100%' }}>
        <Stack spacing={'24px'} alignItems="center" sx={{ width: '50%' }}>
          <Typography variant="h5">{t('create_movie_title')}</Typography>
          <TextField 
            id="movie-title" 
            label={t('form_movie_title')}
            variant="standard" 
            value={movieData.title}
            sx={{ width: '50%' }} 
            error={!!fromValidations.titleError} helperText={fromValidations.titleError} 
            onInput={e => {
              const element = e.target as HTMLInputElement;
              setMovieData({title: element.value, category: movieData.category, rating: movieData.rating});
          }}/>
          <Autocomplete
            id="movie-category"
            options={categories}
            sx={{ width: '50%'}}
            value={{label: getCategoryName(movieData.category), id: movieData.category}}
            renderInput={
              (params) => 
                <TextField {...params} label={t('form_movie_category')} variant="standard" error={!!fromValidations.categoryError} helperText={fromValidations.categoryError}/>}
            onChange={(event: any, value: { label: string; id: number; } | null) => {
              setMovieData({title: movieData.title, category: value?.id || 0, rating: movieData.rating});
            }}
          />
          <Rating
            name="movie-rating"
            sx={{ width: '50%' }}
            precision={0.5}
            max={5}
            value={movieData.rating}
            size="large"
            onChange={(event, newValue) => {
              setMovieData({title: movieData.title, category: movieData.category, rating: newValue || 0});
            }}
          />
          <Box width={"50%"} justifyContent="center" >
            <Grid container sx={{margin: '12px', display: `${loading ? 'visible': 'none'}`}}>
              <Grid item sx={{width: '80%'}}>
                <p>{t('form_saving_movie')}</p>
              </Grid>
              <Grid item sx={{width: '20%'}}>
                <CircularProgress />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={saveMovie} sx={{ marginTop: "16px", marginBottom:"16px", width: '100%', display: `${loading ? 'none': 'visible'}`}}>{t('form_save_movie')}</Button>
          </Box>
        </Stack>
      </Box>
      <AppSnackBar open={snackbar.show} width={"50%"} message={snackbar.message} severity={snackbar.severity as SeverityValues}></AppSnackBar> 
    </Stack>
  );
}

export default MovieCreate;