async function getMovies() {
  const response = await fetch("http://localhost:4001");
  const movies = await response.json();

  return movies;
}

async function deleteMovie(id) {
  const response = await fetch(`http://localhost:4001/${id}`, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
    },
  });
}

async function updateMovie(id, movie) {
  const response = await fetch(`http://localhost:4001/${id}`, {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: {
      Accept: "application/json",
    },
  });
}
