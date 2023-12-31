import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<typeof topFilms>([]);
  const [selectedMovies, setSelectedMovies] = React.useState<typeof topFilms>(
    []
  ); // State to store selected movies
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]); // Include "All" option
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleMovieChange = (_, newValue) => {
    if (newValue.some((option) => option.title === 'All')) {
      setSelectedMovies(newValue.filter((option) => option.title !== 'All'));
    } else {
      setSelectedMovies(newValue);
    }
  };

  const renderTags = () => {
    const selectedCount = selectedMovies.length;

    return (
      <span>
        {selectedCount} {selectedCount === 1 ? 'movie' : 'movies'} selected
      </span>
    );
  };

  const placeholderText = selectedMovies.length === 0 ? 'Movies' : '';

  return (
    <FormControl id="asynchronous-demo">
      <FormLabel>Asynchronous</FormLabel>
      <Autocomplete
        sx={{ width: 300 }}
        placeholder={placeholderText}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        value={selectedMovies} // Pass the selectedMovies state as the value
        onChange={handleMovieChange} // Handle change to update selectedMovies
        multiple // Enable multi-select
        renderInput={(params) => <input {...params} />} // You can use a custom input element
        disablePortal // Optional: Disable the portal for better visual integration
        openOnFocus // Optional: Open the dropdown on input focus
        PopperComponent={({ children, ...other }) => (
          <div {...other}>{children}</div>
        )} // Optional: Render the Popper inline for better visual integration
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <label>
              <input
                type="checkbox"
                checked={selected}
                onChange={() => {}}
                tabIndex={-1}
                readOnly
              />
              {option.title}
            </label>
          </li>
        )}
        renderTags={renderTags} // Custom renderTags function
      />
    </FormControl>
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
