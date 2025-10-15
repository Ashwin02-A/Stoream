import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost/stoream_api/index.php";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data); // Debug API data

      if (Array.isArray(response.data)) {
        setMovies(response.data);
      } else {
        console.error("Invalid API format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addMovie = async () => {
    if (!title || !genre || !year) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(API_URL, { title, genre, year });
      setTitle("");
      setGenre("");
      setYear("");
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const updateMovie = async () => {
    if (!editingMovie) return;

    try {
      await axios.put(API_URL, { id: editingMovie.id, title, genre, year });
      setEditingMovie(null);
      setTitle("");
      setGenre("");
      setYear("");
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(API_URL, { headers: { "Content-Type": "application/json" }, data: { id } });
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const startEditing = (movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(movie.year);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      {editingMovie ? <button onClick={updateMovie}>Update Movie</button> : <button onClick={addMovie}>Add Movie</button>}

      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} - {movie.genre} ({movie.year})
              <button onClick={() => startEditing(movie)}>Edit</button>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
