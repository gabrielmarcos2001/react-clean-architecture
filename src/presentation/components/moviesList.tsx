import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Movie } from '../../domain/models/movie';

export default function VirtualizedList(props: { movies: Movie[] }) {
  const movies = props.movies;
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Title: ${movies[index].title}`} secondary= {`Category: ${movies[index].categoryName}`}/>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}>
      <FixedSizeList
        height={400}
        width={460}
        itemSize={86}
        itemCount={props.movies.length}
        overscanCount={5}>
          {renderRow}
      </FixedSizeList>
    </Box>
  );
}