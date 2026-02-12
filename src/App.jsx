import { useEffect, useState } from "react";

const initialFilmsList = [
  { title: "Inception", genre: "Fantascienza" },
  { title: "Il Padrino", genre: "Thriller" },
  { title: "Titanic", genre: "Romantico" },
  { title: "Batman", genre: "Azione" },
  { title: "Interstellar", genre: "Fantascienza" },
  { title: "Pulp Fiction", genre: "Thriller" },
];

export default function App() {
  const [filmsList, setFilmsList] = useState(initialFilmsList);
  const [filterGenre, setFilterGenre] = useState("");
  const [filteredFilms, setFilteredFilms] = useState(filmsList);

  useEffect(() => {
    const filteredListUpdated = filmsList.filter((film) => {
      film.genre === filterGenre;
    });
    console.log(filteredListUpdated);
  }, [filterGenre]);

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
            <div className="input-group py-2">
              <select
                className="form-select"
                aria-label="Select Film Genre"
                id="genre-select"
                defaultValue={""}
                onChange={(e) => {
                  setFilterGenre(e.target.value);
                }}
              >
                <option value={""}>Seleziona un genere</option>
                {filmsList.map((film, index) => (
                  <option key={index} value={film.genre.toLowerCase()}>
                    {film.genre}
                  </option>
                ))}
              </select>
            </div>

            {/* LIST ITEM */}
            <ul className="list-group pt-3">
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
