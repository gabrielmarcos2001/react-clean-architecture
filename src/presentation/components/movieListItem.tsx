import styled from 'styled-components';

function MovieListItem(props: { movie: any; }) {
  const { movie } = props;
  return <MovieWrapper key={movie.id}>{movie.title}</MovieWrapper>
};

const MovieWrapper = styled.div`
  border: 1px solid black;
  font-size: 20px;
  margin-top: 8px;
  color: black;
  transition: 0.2s;
`;

export default MovieListItem;