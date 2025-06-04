import type { Movie, Series, Genre } from "../types";

// Mock Genres
export const genres: Genre[] = [
  { id: "1", name: "Action" },
  { id: "2", name: "Adventure" },
  { id: "3", name: "Animation" },
  { id: "4", name: "Comedy" },
  { id: "5", name: "Crime" },
  { id: "6", name: "Documentary" },
  { id: "7", name: "Drama" },
  { id: "8", name: "Family" },
  { id: "9", name: "Fantasy" },
  { id: "10", name: "History" },
  { id: "11", name: "Horror" },
  { id: "12", name: "Music" },
  { id: "13", name: "Mystery" },
  { id: "14", name: "Romance" },
  { id: "15", name: "Science Fiction" },
  { id: "16", name: "TV Movie" },
  { id: "17", name: "Thriller" },
  { id: "18", name: "War" },
  { id: "19", name: "Western" },
];

// Mock Movies
export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    overview:
      "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    releaseDate: "2014-11-07",
    runtime: 169,
    genres: [genres[15]!, genres[7]!, genres[2]!],
    rating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    videoUrl: "https://example.com/movies/interstellar.mp4",
    videoQualityOptions: [
      {
        quality: "480p",
        url: "https://example.com/movies/interstellar-480p.mp4",
      },
      {
        quality: "720p",
        url: "https://example.com/movies/interstellar-720p.mp4",
      },
      {
        quality: "1080p",
        url: "https://example.com/movies/interstellar-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "1",
        name: "Matthew McConaughey",
        character: "Cooper",
        profilePath: "/woIE5RQotTD5neq4sX5wHpFjgJQ.jpg",
      },
      {
        id: "2",
        name: "Anne Hathaway",
        character: "Brand",
        profilePath: "/4Nh1zDDrV8NRrtR7aUYT7REwlJl.jpg",
      },
      {
        id: "3",
        name: "Jessica Chastain",
        character: "Murph",
        profilePath: "/lodMzLKSdrPcBry6TdoDsMN3Vge.jpg",
      },
    ],
    director: "Christopher Nolan",
    language: "en",
    subtitles: [
      {
        language: "English",
        url: "https://example.com/subs/interstellar-en.vtt",
      },
      {
        language: "Spanish",
        url: "https://example.com/subs/interstellar-es.vtt",
      },
    ],
    popularity: 95.4,
    averageRating: 8.6,
  },
  {
    id: "2",
    title: "The Avengers",
    overview:
      "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
    posterPath: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdropPath: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    releaseDate: "2012-05-04",
    runtime: 143,
    genres: [genres[0]!, genres[15]!, genres[2]!],
    rating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    videoUrl: "https://example.com/movies/avengers.mp4",
    videoQualityOptions: [
      { quality: "480p", url: "https://example.com/movies/avengers-480p.mp4" },
      { quality: "720p", url: "https://example.com/movies/avengers-720p.mp4" },
      {
        quality: "1080p",
        url: "https://example.com/movies/avengers-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "4",
        name: "Robert Downey Jr.",
        character: "Tony Stark / Iron Man",
        profilePath: "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg",
      },
      {
        id: "5",
        name: "Chris Evans",
        character: "Steve Rogers / Captain America",
        profilePath: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
      },
      {
        id: "6",
        name: "Chris Hemsworth",
        character: "Thor",
        profilePath: "/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg",
      },
    ],
    director: "Joss Whedon",
    language: "en",
    subtitles: [
      { language: "English", url: "https://example.com/subs/avengers-en.vtt" },
      { language: "Spanish", url: "https://example.com/subs/avengers-es.vtt" },
    ],
    popularity: 93.2,
    averageRating: 8.0,
  },
  {
    id: "3",
    title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.",
    posterPath: "/edv5CZvWj09upOsy71SPObS4XES.jpg",
    backdropPath: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    releaseDate: "2010-07-16",
    runtime: 148,
    genres: [genres[0]!, genres[17]!, genres[15]!],
    rating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    videoUrl: "https://example.com/movies/inception.mp4",
    videoQualityOptions: [
      { quality: "480p", url: "https://example.com/movies/inception-480p.mp4" },
      { quality: "720p", url: "https://example.com/movies/inception-720p.mp4" },
      {
        quality: "1080p",
        url: "https://example.com/movies/inception-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "7",
        name: "Leonardo DiCaprio",
        character: "Cobb",
        profilePath: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
      },
      {
        id: "8",
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        profilePath: "/zSWCyWm4gfrCJFKmPiPP5c7IGmb.jpg",
      },
      {
        id: "9",
        name: "Elliot Page",
        character: "Ariadne",
        profilePath: "/rZO5SMOVhV61GVhXpx4gxQ0pSfQ.jpg",
      },
    ],
    director: "Christopher Nolan",
    language: "en",
    subtitles: [
      { language: "English", url: "https://example.com/subs/inception-en.vtt" },
      { language: "Spanish", url: "https://example.com/subs/inception-es.vtt" },
    ],
    popularity: 87.9,
    averageRating: 8.4,
  },
  {
    id: "4",
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    releaseDate: "2008-07-18",
    runtime: 152,
    genres: [genres[0]!, genres[4]!, genres[7]!],
    rating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    videoUrl: "https://example.com/movies/dark-knight.mp4",
    videoQualityOptions: [
      {
        quality: "480p",
        url: "https://example.com/movies/dark-knight-480p.mp4",
      },
      {
        quality: "720p",
        url: "https://example.com/movies/dark-knight-720p.mp4",
      },
      {
        quality: "1080p",
        url: "https://example.com/movies/dark-knight-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "10",
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        profilePath: "/2TMZS9ZBU6rOqYJOMXwvvOog9TY.jpg",
      },
      {
        id: "11",
        name: "Heath Ledger",
        character: "Joker",
        profilePath: "/k9gTdR2TYYrr2xPQftQqwGtOdmV.jpg",
      },
      {
        id: "12",
        name: "Aaron Eckhart",
        character: "Harvey Dent",
        profilePath: "/5EFQvRHlpP1Iaw2e7G5DGkYQYOt.jpg",
      },
    ],
    director: "Christopher Nolan",
    language: "en",
    subtitles: [
      {
        language: "English",
        url: "https://example.com/subs/dark-knight-en.vtt",
      },
      {
        language: "Spanish",
        url: "https://example.com/subs/dark-knight-es.vtt",
      },
    ],
    popularity: 88.4,
    averageRating: 8.9,
  },
  {
    id: "5",
    title: "Pulp Fiction",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropPath: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    releaseDate: "1994-09-10",
    runtime: 154,
    genres: [genres[17]!, genres[4]!],
    rating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    videoUrl: "https://example.com/movies/pulp-fiction.mp4",
    videoQualityOptions: [
      {
        quality: "480p",
        url: "https://example.com/movies/pulp-fiction-480p.mp4",
      },
      {
        quality: "720p",
        url: "https://example.com/movies/pulp-fiction-720p.mp4",
      },
      {
        quality: "1080p",
        url: "https://example.com/movies/pulp-fiction-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "13",
        name: "John Travolta",
        character: "Vincent Vega",
        profilePath: "/ns8IeuEGPmGwOlgJ8VpFgvgJ9oo.jpg",
      },
      {
        id: "14",
        name: "Samuel L. Jackson",
        character: "Jules Winnfield",
        profilePath: "/mXN4Gw9tZJVKrLJHde2IcUHmV3P.jpg",
      },
      {
        id: "15",
        name: "Uma Thurman",
        character: "Mia Wallace",
        profilePath: "/6xSPUFG3shL76W2WqIJCsKbCw4d.jpg",
      },
    ],
    director: "Quentin Tarantino",
    language: "en",
    subtitles: [
      {
        language: "English",
        url: "https://example.com/subs/pulp-fiction-en.vtt",
      },
      {
        language: "Spanish",
        url: "https://example.com/subs/pulp-fiction-es.vtt",
      },
    ],
    popularity: 81.7,
    averageRating: 8.7,
  },
  {
    id: "6",
    title: "The Matrix",
    overview:
      "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath: "/l4QHerTSbMI7qgvasqxP36pqjN6.jpg",
    releaseDate: "1999-03-31",
    runtime: 136,
    genres: [genres[0]!, genres[15]!],
    rating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
    videoUrl: "https://example.com/movies/matrix.mp4",
    videoQualityOptions: [
      { quality: "480p", url: "https://example.com/movies/matrix-480p.mp4" },
      { quality: "720p", url: "https://example.com/movies/matrix-720p.mp4" },
      { quality: "1080p", url: "https://example.com/movies/matrix-1080p.mp4" },
    ],
    cast: [
      {
        id: "16",
        name: "Keanu Reeves",
        character: "Neo",
        profilePath: "/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg",
      },
      {
        id: "17",
        name: "Laurence Fishburne",
        character: "Morpheus",
        profilePath: "/8suOhUmPbfKqDT9UrL9kTRIKwjw.jpg",
      },
      {
        id: "18",
        name: "Carrie-Anne Moss",
        character: "Trinity",
        profilePath: "/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg",
      },
    ],
    director: "The Wachowskis",
    language: "en",
    subtitles: [
      { language: "English", url: "https://example.com/subs/matrix-en.vtt" },
      { language: "Spanish", url: "https://example.com/subs/matrix-es.vtt" },
    ],
    popularity: 84.5,
    averageRating: 8.5,
  },
  {
    id: "7",
    title: "Dune",
    overview:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
    posterPath: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdropPath: "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    releaseDate: "2021-10-22",
    runtime: 155,
    genres: [genres[15]!, genres[2]!],
    rating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
    videoUrl: "https://example.com/movies/dune.mp4",
    videoQualityOptions: [
      { quality: "480p", url: "https://example.com/movies/dune-480p.mp4" },
      { quality: "720p", url: "https://example.com/movies/dune-720p.mp4" },
      { quality: "1080p", url: "https://example.com/movies/dune-1080p.mp4" },
    ],
    cast: [
      {
        id: "28",
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        profilePath: "/7Sz9J68Pd0zCj4UxKmg8J1hUZKU.jpg",
      },
      {
        id: "29",
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        profilePath: "/lJloTOheuQSirSLXNA3JHsrMNfH.jpg",
      },
      {
        id: "30",
        name: "Oscar Isaac",
        character: "Duke Leto Atreides",
        profilePath: "/dW5U5yrIIPmMjRThR9KX5K3YjJn.jpg",
      },
    ],
    director: "Denis Villeneuve",
    language: "en",
    subtitles: [
      { language: "English", url: "https://example.com/subs/dune-en.vtt" },
      { language: "Spanish", url: "https://example.com/subs/dune-es.vtt" },
    ],
    popularity: 92.8,
    averageRating: 8.2,
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    overview:
      "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropPath: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    releaseDate: "1994-09-23",
    runtime: 142,
    genres: [genres[7]!, genres[4]!],
    rating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    videoUrl: "https://example.com/movies/shawshank-redemption.mp4",
    videoQualityOptions: [
      {
        quality: "480p",
        url: "https://example.com/movies/shawshank-redemption-480p.mp4",
      },
      {
        quality: "720p",
        url: "https://example.com/movies/shawshank-redemption-720p.mp4",
      },
      {
        quality: "1080p",
        url: "https://example.com/movies/shawshank-redemption-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "31",
        name: "Tim Robbins",
        character: "Andy Dufresne",
        profilePath: "/A01vw5dS3jScwpJzRThnkJJj3bH.jpg",
      },
      {
        id: "32",
        name: "Morgan Freeman",
        character: "Ellis Boyd 'Red' Redding",
        profilePath: "/oIciQWrLmUaRYneVFwwBgw8OZat.jpg",
      },
      {
        id: "33",
        name: "Bob Gunton",
        character: "Warden Norton",
        profilePath: "/bKSIOJ1sWpXoAhEsSXq5U9SsMzN.jpg",
      },
    ],
    director: "Frank Darabont",
    language: "en",
    subtitles: [
      {
        language: "English",
        url: "https://example.com/subs/shawshank-redemption-en.vtt",
      },
      {
        language: "Spanish",
        url: "https://example.com/subs/shawshank-redemption-es.vtt",
      },
    ],
    popularity: 86.9,
    averageRating: 9.3,
  },
  {
    id: "9",
    title: "Parasite",
    overview:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg",
    releaseDate: "2019-05-30",
    runtime: 132,
    genres: [genres[7]!, genres[4]!, genres[17]!],
    rating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=isOGD_7hNIY",
    videoUrl: "https://example.com/movies/parasite.mp4",
    videoQualityOptions: [
      { quality: "480p", url: "https://example.com/movies/parasite-480p.mp4" },
      { quality: "720p", url: "https://example.com/movies/parasite-720p.mp4" },
      {
        quality: "1080p",
        url: "https://example.com/movies/parasite-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "34",
        name: "Song Kang-ho",
        character: "Kim Ki-taek",
        profilePath: "/eWp5Aqh2HLTKGmwbGzIE9Tx3qW.jpg",
      },
      {
        id: "35",
        name: "Lee Sun-kyun",
        character: "Park Dong-ik",
        profilePath: "/lKxk9SvpVZWRGiNyIvZbMTMbfBF.jpg",
      },
      {
        id: "36",
        name: "Cho Yeo-jeong",
        character: "Park Yeon-kyo",
        profilePath: "/kYWLxz5dkNlm1PYgJa8vgeJ3AeR.jpg",
      },
    ],
    director: "Bong Joon-ho",
    language: "ko",
    subtitles: [
      { language: "English", url: "https://example.com/subs/parasite-en.vtt" },
      { language: "Spanish", url: "https://example.com/subs/parasite-es.vtt" },
    ],
    popularity: 89.5,
    averageRating: 8.9,
  },
  {
    id: "10",
    title: "Everything Everywhere All at Once",
    overview:
      "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
    posterPath: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdropPath: "/nW5fUbldp1DYf2uQ3zJTUdachOu.jpg",
    releaseDate: "2022-03-25",
    runtime: 139,
    genres: [genres[0]!, genres[2]!, genres[4]!, genres[15]!],
    rating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
    videoUrl: "https://example.com/movies/everything-everywhere.mp4",
    videoQualityOptions: [
      {
        quality: "480p",
        url: "https://example.com/movies/everything-everywhere-480p.mp4",
      },
      {
        quality: "720p",
        url: "https://example.com/movies/everything-everywhere-720p.mp4",
      },
      {
        quality: "1080p",
        url: "https://example.com/movies/everything-everywhere-1080p.mp4",
      },
    ],
    cast: [
      {
        id: "37",
        name: "Michelle Yeoh",
        character: "Evelyn Wang",
        profilePath: "/6oxvfyqjKKJ0bYZpXcusz1CpD2T.jpg",
      },
      {
        id: "38",
        name: "Ke Huy Quan",
        character: "Waymond Wang",
        profilePath: "/kD4FeIYhKtQI1ONYGZsNmZIgsi4.jpg",
      },
      {
        id: "39",
        name: "Jamie Lee Curtis",
        character: "Deirdre Beaubeirdre",
        profilePath: "/w65phx3T8pvrdTMzNnBtAcnI8c2.jpg",
      },
    ],
    director: "Daniel Kwan, Daniel Scheinert",
    language: "en",
    subtitles: [
      {
        language: "English",
        url: "https://example.com/subs/everything-everywhere-en.vtt",
      },
      {
        language: "Spanish",
        url: "https://example.com/subs/everything-everywhere-es.vtt",
      },
    ],
    popularity: 91.2,
    averageRating: 8.8,
  },
];

// Mock TV Series
export const series: Series[] = [
  {
    id: "1",
    title: "Stranger Things",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    posterPath: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdropPath: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    firstAirDate: "2016-07-15",
    lastAirDate: "2022-07-01",
    status: "Running",
    genres: [genres[7]!, genres[9]!, genres[15]!],
    rating: "TV-14",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    seasons: [
      {
        id: "1-1",
        seasonNumber: 1,
        title: "Season 1",
        overview:
          "A young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
        posterPath: "/rbnuP7hlOrpTELmY8qI0BzgQ1wC.jpg",
        airDate: "2016-07-15",
        episodes: [
          {
            id: "1-1-1",
            episodeNumber: 1,
            title: "Chapter One: The Vanishing of Will Byers",
            overview:
              "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            stillPath: "/AdwF2jXvhdODr6gUZ61bHKRkz09.jpg",
            airDate: "2016-07-15",
            runtime: 49,
            videoUrl: "https://example.com/series/stranger-things/s01e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/stranger-things/s01e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/stranger-things/s01e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/stranger-things/s01e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/stranger-things/s01e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/stranger-things/s01e01-es.vtt",
              },
            ],
          },
          {
            id: "1-1-2",
            episodeNumber: 2,
            title: "Chapter Two: The Weirdo on Maple Street",
            overview:
              "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
            stillPath: "/8SRUfRUi6x6p0rKbo0Bj9pEs3AH.jpg",
            airDate: "2016-07-15",
            runtime: 46,
            videoUrl: "https://example.com/series/stranger-things/s01e02.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/stranger-things/s01e02-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/stranger-things/s01e02-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/stranger-things/s01e02-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/stranger-things/s01e02-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/stranger-things/s01e02-es.vtt",
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        seasonNumber: 2,
        title: "Season 2",
        overview:
          "It's been nearly a year since Will's strange disappearance. But life's hardly back to normal in Hawkins. Not even close.",
        posterPath: "/lXS60geme1LlEob5Wgvj3KilClA.jpg",
        airDate: "2017-10-27",
        episodes: [
          {
            id: "1-2-1",
            episodeNumber: 1,
            title: "Chapter One: MADMAX",
            overview:
              "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
            stillPath: "/93PBQz7QGVwfOmzLBXw2hGk4DZZ.jpg",
            airDate: "2017-10-27",
            runtime: 48,
            videoUrl: "https://example.com/series/stranger-things/s02e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/stranger-things/s02e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/stranger-things/s02e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/stranger-things/s02e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/stranger-things/s02e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/stranger-things/s02e01-es.vtt",
              },
            ],
          },
        ],
      },
    ],
    cast: [
      {
        id: "19",
        name: "Millie Bobby Brown",
        character: "Eleven",
        profilePath: "/yzfxLMcBMusKzZp9f1Z9Ags8WML.jpg",
      },
      {
        id: "20",
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        profilePath: "/uqifhcmDiq3ergXPo9qFN6uJvmr.jpg",
      },
      {
        id: "21",
        name: "Winona Ryder",
        character: "Joyce Byers",
        profilePath: "/dFfn5HHj5I8dGyzEqRhH5hVlfoZ.jpg",
      },
    ],
    creator: "The Duffer Brothers",
    language: "en",
    popularity: 95.8,
    averageRating: 8.7,
  },
  {
    id: "2",
    title: "Breaking Bad",
    overview:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    posterPath: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdropPath: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    firstAirDate: "2008-01-20",
    lastAirDate: "2013-09-29",
    status: "Ended",
    genres: [genres[7]!, genres[4]!, genres[17]!],
    rating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    seasons: [
      {
        id: "2-1",
        seasonNumber: 1,
        title: "Season 1",
        overview:
          "High school chemistry teacher Walter White's life is suddenly transformed by a dire medical diagnosis. Street-savvy former student Jesse Pinkman 'teaches' Walter a new trade.",
        posterPath: "/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg",
        airDate: "2008-01-20",
        episodes: [
          {
            id: "2-1-1",
            episodeNumber: 1,
            title: "Pilot",
            overview:
              "Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.",
            stillPath: "/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg",
            airDate: "2008-01-20",
            runtime: 58,
            videoUrl: "https://example.com/series/breaking-bad/s01e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/breaking-bad/s01e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/breaking-bad/s01e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/breaking-bad/s01e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/breaking-bad/s01e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/breaking-bad/s01e01-es.vtt",
              },
            ],
          },
        ],
      },
    ],
    cast: [
      {
        id: "22",
        name: "Bryan Cranston",
        character: "Walter White",
        profilePath: "/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg",
      },
      {
        id: "23",
        name: "Aaron Paul",
        character: "Jesse Pinkman",
        profilePath: "/za7iM0vOsVGqQ9vuJx5xnBLpL0w.jpg",
      },
      {
        id: "24",
        name: "Anna Gunn",
        character: "Skyler White",
        profilePath: "/lKlGjfmu9mJcF4upNrhtG3X9uyq.jpg",
      },
    ],
    creator: "Vince Gilligan",
    language: "en",
    popularity: 92.3,
    averageRating: 9.3,
  },
  {
    id: "3",
    title: "Game of Thrones",
    overview:
      "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and the icy horrors beyond.",
    posterPath: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdropPath: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
    firstAirDate: "2011-04-17",
    lastAirDate: "2019-05-19",
    status: "Ended",
    genres: [genres[0]!, genres[2]!, genres[7]!],
    rating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=KPLWWIOCOOQ",
    seasons: [
      {
        id: "3-1",
        seasonNumber: 1,
        title: "Season 1",
        overview:
          "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned.",
        posterPath: "/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg",
        airDate: "2011-04-17",
        episodes: [
          {
            id: "3-1-1",
            episodeNumber: 1,
            title: "Winter Is Coming",
            overview:
              "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his old friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
            stillPath: "/wrGWeW4WKxnaeA8sxJb2T9O6ryo.jpg",
            airDate: "2011-04-17",
            runtime: 62,
            videoUrl: "https://example.com/series/game-of-thrones/s01e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/game-of-thrones/s01e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/game-of-thrones/s01e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/game-of-thrones/s01e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/game-of-thrones/s01e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/game-of-thrones/s01e01-es.vtt",
              },
            ],
          },
        ],
      },
    ],
    cast: [
      {
        id: "25",
        name: "Emilia Clarke",
        character: "Daenerys Targaryen",
        profilePath: "/r6i4C3kYrBRzUzZ8JKAHYQ0T0dD.jpg",
      },
      {
        id: "26",
        name: "Kit Harington",
        character: "Jon Snow",
        profilePath: "/noInYj8lLUjYTwUl7hgcW8XGdr1.jpg",
      },
      {
        id: "27",
        name: "Peter Dinklage",
        character: "Tyrion Lannister",
        profilePath: "/lRsRgnksAhBRXwAB68MFjmTtLrk.jpg",
      },
    ],
    creator: "David Benioff, D.B. Weiss",
    language: "en",
    popularity: 90.5,
    averageRating: 8.8,
  },
  {
    id: "4",
    title: "The Mandalorian",
    overview:
      "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
    posterPath: "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    backdropPath: "/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
    firstAirDate: "2019-11-12",
    lastAirDate: "2023-04-19",
    status: "Running",
    genres: [genres[0]!, genres[2]!, genres[15]!],
    rating: "TV-14",
    trailerUrl: "https://www.youtube.com/watch?v=aOC8E8z_ifw",
    seasons: [
      {
        id: "4-1",
        seasonNumber: 1,
        title: "Season 1",
        overview:
          "A Mandalorian bounty hunter tracks a target for a well-paying client.",
        posterPath: "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        airDate: "2019-11-12",
        episodes: [
          {
            id: "4-1-1",
            episodeNumber: 1,
            title: "Chapter 1: The Mandalorian",
            overview:
              "A Mandalorian bounty hunter tracks a target for a well-paying client.",
            stillPath: "/2xxtG6Jf1YjG9xxjKcWNT9tNQvD.jpg",
            airDate: "2019-11-12",
            runtime: 39,
            videoUrl: "https://example.com/series/mandalorian/s01e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/mandalorian/s01e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/mandalorian/s01e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/mandalorian/s01e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/mandalorian/s01e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/mandalorian/s01e01-es.vtt",
              },
            ],
          },
        ],
      },
    ],
    cast: [
      {
        id: "40",
        name: "Pedro Pascal",
        character: "The Mandalorian",
        profilePath: "/wWKuLUyqza4oGtBgkVvGGR1jgZW.jpg",
      },
      {
        id: "41",
        name: "Carl Weathers",
        character: "Greef Karga",
        profilePath: "/aGzAZ0TkJOndPpxFRSKtopOJbNI.jpg",
      },
      {
        id: "42",
        name: "Giancarlo Esposito",
        character: "Moff Gideon",
        profilePath: "/5Punz8bscH0PlbCZcqYk0oMEW0Y.jpg",
      },
    ],
    creator: "Jon Favreau",
    language: "en",
    popularity: 93.7,
    averageRating: 8.5,
  },
  {
    id: "5",
    title: "The Queen's Gambit",
    overview:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
    posterPath: "/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    backdropPath: "/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    firstAirDate: "2020-10-23",
    lastAirDate: "2020-10-23",
    status: "Ended",
    genres: [genres[7]!],
    rating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=CDrieqwSdgI",
    seasons: [
      {
        id: "5-1",
        seasonNumber: 1,
        title: "Limited Series",
        overview:
          "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
        posterPath: "/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
        airDate: "2020-10-23",
        episodes: [
          {
            id: "5-1-1",
            episodeNumber: 1,
            title: "Openings",
            overview:
              "Sent to an orphanage at age 9, Beth develops an uncanny talent for chess and a growing dependence on the tranquilizers given to the children.",
            stillPath: "/6zNPr1E5AjQoMzHNFYhKZ9jgXdR.jpg",
            airDate: "2020-10-23",
            runtime: 60,
            videoUrl: "https://example.com/series/queens-gambit/s01e01.mp4",
            videoQualityOptions: [
              {
                quality: "480p",
                url: "https://example.com/series/queens-gambit/s01e01-480p.mp4",
              },
              {
                quality: "720p",
                url: "https://example.com/series/queens-gambit/s01e01-720p.mp4",
              },
              {
                quality: "1080p",
                url: "https://example.com/series/queens-gambit/s01e01-1080p.mp4",
              },
            ],
            subtitles: [
              {
                language: "English",
                url: "https://example.com/subs/queens-gambit/s01e01-en.vtt",
              },
              {
                language: "Spanish",
                url: "https://example.com/subs/queens-gambit/s01e01-es.vtt",
              },
            ],
          },
        ],
      },
    ],
    cast: [
      {
        id: "43",
        name: "Anya Taylor-Joy",
        character: "Beth Harmon",
        profilePath: "/1zLqXCO7WVuTXDz8GB8XwRfFKlf.jpg",
      },
      {
        id: "44",
        name: "Thomas Brodie-Sangster",
        character: "Benny Watts",
        profilePath: "/sFYqQK7Gx0bxaYYvXWWQaZlrM0J.jpg",
      },
      {
        id: "45",
        name: "Harry Melling",
        character: "Harry Beltik",
        profilePath: "/8ib0N8huAYVOlZ3R8J0YNQXVVpM.jpg",
      },
    ],
    creator: "Scott Frank, Allan Scott",
    language: "en",
    popularity: 88.9,
    averageRating: 8.6,
  },
];

// Featured content on homepage
export const featuredContent = [
  { id: movies[0]!.id, type: "movie" as const },
  { id: series[0]!.id, type: "series" as const },
  { id: movies[2]!.id, type: "movie" as const },
];

// Recent content
export const recentContent = [
  { id: movies[1]!.id, type: "movie" as const },
  { id: series[1]!.id, type: "series" as const },
  { id: movies[3]!.id, type: "movie" as const },
  { id: series[2]!.id, type: "series" as const },
];

// Website settings
export const websiteSettings = {
  title: "StreamFlix",
  logoUrl: "/logo.svg",
  theme: "system" as const,
  featuredContent,
};
