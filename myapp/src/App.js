import React, { useState, useEffect } from "react";

const moviesData = [
  { title: "The Matrix", rating: 7.5, category: "Action" },
  { title: "Focus", rating: 6.9, category: "Comedy" },
  { title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { title: "Everly", rating: 5.0, category: "Action" },
  { title: "Maps to the Stars", rating: 7.5, category: "Drama" },
];

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedGen, setSelectedGen] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const filtered = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRatings.length === 0 || selectedRatings.includes(movie.rating)) &&
        (selectedGen.length === 0 || selectedGen.includes(movie.category))
    );
    setFilteredMovies(filtered);
  }, [searchTerm, selectedRatings, selectedGen]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleGenreChange = (genre) => {
    if (selectedGen.includes(genre)) {
      setSelectedGen(selectedGen.filter((g) => g !== genre));
    } else {
      setSelectedGen([...selectedGen, genre]);
    }
  };

  return (
    <div style={{textAlign:"center", justifyContent:"center"}}>
     <h1 style={{color:"teal", fontFamily:"sans-serif"}}>Search Movies Names</h1>
      <input style={{marginTop:"10px"}}
        type="text"
        placeholder="Enter Movie Names"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <h4 style={{color:"black", fontSize:"20px"}}>Filter By Rating</h4>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <label key={rating}>
            <input
              type="checkbox"
              value={rating}
              checked={selectedRatings.includes(rating)}
              onChange={() => handleRatingChange(rating)}
            />
            {rating} STARS
          </label>
        ))}
      </div>
      <div>
        <h4  style={{color:"black", fontSize:"20px"}}>Filter By Category</h4>
        {Array.from(new Set(moviesData.map((movie) => movie.category))).map(
          (genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGen.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          )
        )}
      </div>
      <div>
        <h4  style={{color:"black", fontSize:"20px" }}>Filtered Movies Names</h4>
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.title}>
              {movie.title} - {movie.rating} Stars - {movie.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieSearch;
