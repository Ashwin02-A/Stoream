import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table, Modal, Container, Row, Col } from 'react-bootstrap';

function AdminPage() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    category: 'Tamil Movies',
    release_date: '',
    poster: null,
    movie: null,
  });
  const [editingMovieId, setEditingMovieId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      console.log('Fetching movies from:', 'http://localhost/stoream_api/movies.php');
      const response = await axios.get('http://localhost/stoream_api/movies.php', {
        timeout: 300000, // 5 minutes for large files
      });
      console.log('Movies response:', response.data);
      console.log('Response headers:', response.headers);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config,
      });
    }
  };

  const addOrUpdateMovie = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', newMovie);

    const formData = new FormData();
    formData.append('title', newMovie.title);
    formData.append('description', newMovie.description);
    formData.append('category', newMovie.category);
    formData.append('release_date', newMovie.release_date);
    if (newMovie.poster) formData.append('poster', newMovie.poster);
    if (newMovie.movie) formData.append('movie', newMovie.movie);

    console.log('FormData entries:', Array.from(formData.entries()));

    try {
      console.log('Sending POST to:', 'http://localhost/stoream_api/movies.php');
      let response;
      if (editingMovieId) {
        formData.append('id', editingMovieId);
        response = await axios.put('http://localhost/stoream_api/movies.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 300000, // 5 minutes for large files
          onUploadProgress: (progressEvent) => {
            console.log('Upload progress:', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
          },
        });
      } else {
        response = await axios.post('http://localhost/stoream_api/movies.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 300000, // 5 minutes for large files
          onUploadProgress: (progressEvent) => {
            console.log('Upload progress:', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
          },
        });
      }

      console.log('Response:', response.data);
      console.log('Response headers:', response.headers);
      if (response.data.id || response.data.message) {
        fetchMovies(); // Refresh the list
        setNewMovie({
          title: '',
          description: '',
          category: 'Tamil Movies',
          release_date: '',
          poster: null,
          movie: null,
        });
        setEditingMovieId(null);
      }
    } catch (error) {
      console.error('Error saving movie:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config,
      });
      alert('Failed to save movie: ' + (error.response?.data?.error || error.message || JSON.stringify(error)));
    }
  };

  const deleteMovie = async (id) => {
    try {
      console.log(`Deleting movie with ID: ${id}`);
      const response = await axios.delete('http://localhost/stoream_api/movies.php', {
        headers: { 'Content-Type': 'application/json' },
        data: { id }, // Use `data` instead of `body` for axios DELETE
        timeout: 300000, // 5 minutes
      });
      console.log('Delete response:', response.data);
      if (response.data.message) {
        fetchMovies(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting movie:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      alert('Failed to delete movie: ' + error.message);
    }
  };

  const editMovie = (movie) => {
    console.log('Editing movie:', movie);
    setEditingMovieId(movie.id);
    setNewMovie({
      title: movie.title,
      description: movie.description,
      category: movie.category,
      release_date: movie.release_date,
      poster: null, // Reset file inputs for upload
      movie: null,
    });
    setShowMovieModal(true);
  };

  const [showMovieModal, setShowMovieModal] = useState(false);

  return (
    <div className="movie-app-wrapper">
      <header className="movie-app-header">
        <h1 className="movie-app-title">Movie App</h1>
        <Button className="movie-app-add-btn" onClick={() => { setShowMovieModal(true); setEditingMovieId(null); }}>Add Movie</Button>
      </header>
      <main className="movie-app-main">
        <Modal show={showMovieModal} onHide={() => { setShowMovieModal(false); setEditingMovieId(null); }}>
          <Modal.Header closeButton>
            <Modal.Title>{editingMovieId ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addOrUpdateMovie} encType="multipart/form-data">
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={newMovie.category}
                  onChange={(e) => setNewMovie({ ...newMovie, category: e.target.value })}
                  required
                >
                  <option value="Tamil Movies">Tamil Movies</option>
                  <option value="Web Series">Web Series</option>
                  <option value="Animation Movies">Animation Movies</option>
                  <option value="Hollywood Movies">Hollywood Movies</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formReleaseDate" className="mb-3">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newMovie.release_date}
                  onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPoster" className="mb-3">
                <Form.Label>Poster Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.files[0] })}
                />
              </Form.Group>
              <Form.Group controlId="formMovie" className="mb-3">
                <Form.Label>Movie File</Form.Label>
                <Form.Control
                  type="file"
                  accept="video/*, video/x-matroska"
                  onChange={(e) => setNewMovie({ ...newMovie, movie: e.target.files[0] })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editingMovieId ? 'Update Movie' : 'Add Movie'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Table striped bordered hover className="movie-app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Poster</th>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.category}</td>
                <td><img src={`http://localhost/stoream_api/${movie.poster_path}`} alt={movie.title} style={{ width: '100px' }} /></td>
                <td>{movie.movie_path ? <a href={`http://localhost/stoream_api/${movie.movie_path}`} target="_blank" rel="noopener noreferrer">View Movie</a> : 'No movie'}</td>
                <td>{new Date(movie.release_date).toLocaleDateString()}</td>
                <td>
                  <Button variant="primary" onClick={() => editMovie(movie)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => deleteMovie(movie.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
}

export default AdminPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Table, Modal, Container, Row, Col } from 'react-bootstrap';

// const AdminPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [newMovie, setNewMovie] = useState({ title: '', description: '', category: 'Tamil Movies', poster: null, movie: null, release_date: '' });
//   const [showMovieModal, setShowMovieModal] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       console.log('Fetching movies from:', 'http://localhost/stoream_api/movies');
//       const response = await axios.get('http://localhost/stoream_api/movies', {
//         timeout: 300000, // 5 minutes for large files
//       });
//       console.log('Movies response:', response.data);
//       console.log('Response headers:', response.headers);
//       setMovies(response.data);
//     } catch (error) {
//       console.error('Error fetching movies:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         headers: error.response?.headers,
//         config: error.config,
//       });
//     }
//   };

//   const handleMovieSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form submitted with:', newMovie);

//     const formData = new FormData();
//     formData.append('title', newMovie.title);
//     formData.append('description', newMovie.description);
//     formData.append('category', newMovie.category);
//     formData.append('release_date', newMovie.release_date);
//     if (newMovie.poster) formData.append('poster', newMovie.poster);
//     if (newMovie.movie) formData.append('movie', newMovie.movie);

//     console.log('FormData entries:', Array.from(formData.entries()));

//     try {
//       console.log('Sending POST to:', 'http://localhost/stoream_api/movies');
//       const response = await axios.post('http://localhost/stoream_api/movies', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 300000, // 5 minutes for large files
//         onUploadProgress: (progressEvent) => {
//           console.log('Upload progress:', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
//         },
//       });
//       console.log('Create response:', response.data);
//       console.log('Response headers:', response.headers);
//       setShowMovieModal(false);
//       setNewMovie({ title: '', description: '', category: 'Tamil Movies', poster: null, movie: null, release_date: '' });
//       setSelectedMovie(null);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error saving movie:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         headers: error.response?.headers,
//         config: error.config,
//       });
//       alert('Failed to save movie: ' + (error.response?.data?.error || error.message || JSON.stringify(error)));
//     }
//   };

//   const handleDeleteMovie = async (id) => {
//     try {
//       console.log(`Deleting movie with ID: ${id}`);
//       const response = await axios.delete(`http://localhost/stoream_api/movies?id=${id}`, {
//         timeout: 300000, // 5 minutes
//       });
//       console.log('Delete response:', response.data);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error deleting movie:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         headers: error.response?.headers,
//       });
//     }
//   };

//   const handleMovieEdit = (movie) => {
//     console.log('Editing movie:', movie);
//     setSelectedMovie(movie);
//     setNewMovie({ ...movie, poster: null, movie: null });
//     setShowMovieModal(true);
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Admin Dashboard - Movies</h1>
//       <Row>
//         <Col>
//           <h2>Movies</h2>
//           <Button onClick={() => { setShowMovieModal(true); setSelectedMovie(null); }} className="mb-3">Add Movie</Button>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Poster</th>
//                 <th>Movie</th>
//                 <th>Release Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {movies.map(movie => (
//                 <tr key={movie.id}>
//                   <td>{movie.id}</td>
//                   <td>{movie.title}</td>
//                   <td>{movie.description}</td>
//                   <td>{movie.category}</td>
//                   <td><img src={`http://localhost/stoream_api${movie.poster_path}`} alt={movie.title} style={{ width: '100px' }} /></td>
//                   <td>{movie.movie_path ? <a href={`http://localhost/stoream_api${movie.movie_path}`} target="_blank" rel="noopener noreferrer">View Movie</a> : 'No movie'}</td>
//                   <td>{new Date(movie.release_date).toLocaleDateString()}</td>
//                   <td>
//                     <Button variant="primary" onClick={() => handleMovieEdit(movie)} className="me-2">Edit</Button>
//                     <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>Delete</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Movie Modal */}
//       <Modal show={showMovieModal} onHide={() => { setShowMovieModal(false); setSelectedMovie(null); }}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedMovie ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleMovieSubmit} encType="multipart/form-data">
//             <Form.Group controlId="formTitle" className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control type="text" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} required />
//             </Form.Group>
//             <Form.Group controlId="formDescription" className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control as="textarea" rows={3} value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
//             </Form.Group>
//             <Form.Group controlId="formCategory" className="mb-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Control as="select" value={newMovie.category} onChange={(e) => setNewMovie({ ...newMovie, category: e.target.value })} required>
//                 <option value="Tamil Movies">Tamil Movies</option>
//                 <option value="Web Series">Web Series</option>
//                 <option value="Animation Movies">Animation Movies</option>
//                 <option value="Hollywood Movies">Hollywood Movies</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formPoster" className="mb-3">
//               <Form.Label>Poster Image</Form.Label>
//               <Form.Control type="file" accept="image/*" onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.files[0] })} />
//             </Form.Group>
//             <Form.Group controlId="formMovie" className="mb-3">
//               <Form.Label>Movie File</Form.Label>
//               <Form.Control type="file" accept="video/*, video/x-matroska" onChange={(e) => setNewMovie({ ...newMovie, movie: e.target.files[0] })} />
//             </Form.Group>
//             <Form.Group controlId="formReleaseDate" className="mb-3">
//               <Form.Label>Release Date</Form.Label>
//               <Form.Control type="date" value={newMovie.release_date} onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })} required />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               {selectedMovie ? 'Update Movie' : 'Add Movie'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default AdminPage;