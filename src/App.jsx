import { useEffect, useState } from "react";
import { movies } from "./data/movies";

const genresList = [];

movies.forEach((movie) => {
  if (!genresList.includes(movie.genre)) genresList.push(movie.genre);
});

export default function App() {
  /* INITIAL FILMS LIST */
  const [filmsList, setFilmsList] = useState(movies);

  /* FILMS GENRES FILTER  */
  const [filterGenre, setFilterGenre] = useState();

  /* SEARCH FILMS */
  const [searchedFilm, setSearchedFilm] = useState("");

  /* FILTERED LIST */
  const [filteredFilms, setFilteredFilms] = useState(filmsList);

  useEffect(() => {
    let filteredListUpdated = filmsList.filter((film) => {
      const sanitizedSearchedFilm = searchedFilm.toLowerCase().trim();
      const sanitizedFilmsTitle = film.title.toLowerCase().trim();
      return sanitizedFilmsTitle.includes(sanitizedSearchedFilm);
    });

    if (filterGenre) {
      filteredListUpdated = filteredListUpdated.filter(
        (film) => film.genre.toLowerCase() === filterGenre,
      );
      setFilteredFilms(filteredListUpdated);
    }
  }, [searchedFilm, filterGenre]);

  return (
    <>
      <div className="container my-5">
        <div className="card">
          {/* HEADER */}
          <div className="card-header text-center">
            <h1>Movie Filter</h1>
          </div>

          {/* MAIN */}
          <div className="card-body">
            {/* SELECT INPUT */}
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="searchFilm"
                placeholder="Cerca un film"
                //
                value={searchedFilm}
                onChange={(e) => setSearchedFilm(e.target.value)}
              />
              <label htmlFor="searchFilm">Cerca un film</label>
            </div>
            <div className="form-floating mt-2">
              <select
                className="form-select"
                aria-label="Select Film Genre"
                id="genre-select"
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <option value={""}>Tutti i generi</option>
                {genresList.map((genre, index) => (
                  <option key={index} value={genre.toLowerCase()}>
                    {genre}
                  </option>
                ))}
              </select>
              <label htmlFor="genre-select">Seleziona un genere</label>
            </div>
            {/* LIST ITEM */}
            <ul className="list-group pt-4">
              {filteredFilms.map((film, index) => (
                <li key={index} className="list-group-item">
                  {film.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
