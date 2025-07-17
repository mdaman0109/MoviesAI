import { createSlice } from "@reduxjs/toolkit"
const moviesSlice = createSlice(
    {
        name : "movies",
        initialState: {nowPlayingMovies : false, 
            popularMovies :false,
            topRatedMovies:false,
            upcomingMovies:false, 
            trailerVideo:false,
            movieInfo: null,
            castInfo: null,
            movieVideos: null,
            castMovies: null,
            
        },
        reducers:
        {
            addNowPlayingMovies :(state, action) =>
            {
                state.nowPlayingMovies = action.payload;

            },
             addPopularMovies :(state, action) =>
            {
                state.popularMovies = action.payload;

            },

            addTopRatedMovies :(state, action) =>
            {
                state.topRatedMovies = action.payload;

            },

            addUpcomingMovies :(state, action) =>
            {
                state.upcomingMovies = action.payload;

            },
            addTrailerVideo:(state,action)=>
            {
                state.trailerVideo=action.payload;
            },
            addMovieInfo: (state, action) => {
            state.movieInfo = action.payload;
        },
        clearMovieInfo: (state, action) => {
            state.movieInfo = null;
        },
        addCastInfo: (state, action) => {
            state.castInfo = action.payload;
        },
        addMovieVideos: (state, action) => {
            state.movieVideos = action.payload;
        },
        addCastMovies: (state, action) => {
            state.castMovies = action.payload;
        },
        clearCastMovies: (state, action) => {
            state.castMovies = null;
        },

          
        }

    }
)
export default moviesSlice.reducer;
export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addMovieInfo, addCastInfo, addMovieVideos, clearMovieInfo, addCastMovies, clearCastMovies} = moviesSlice.actions;
