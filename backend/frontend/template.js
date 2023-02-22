const movieTemplate = (movie) => {
  return `<li>
    <article>
        <h1 class="h1-movie">${movie.title}</h1>
        <img src="${movie.cover_image_url}">
        <p>Director:${movie.director}
         Genre:${movie.genre}
         Release Date:${movie.release_date}
         </p>
         <button 
         class ="delete-movie-btn" 
         data-id=${movie.id}
         onClick="startEditingMovie (this, ${movie.id})"
         >Edit 
         </button>

         <button 
         class ="delete-movie-btn" 
         data-id=${movie.id}
         onClick="deleteMovieAction(this, ${movie.id})"
         >Delete 
         </button>
    </article>
</li>`;
};
