import { createSlice } from "@reduxjs/toolkit";
const AISearchSlice = createSlice(

    {
        name:'ai',
        initialState:{
            showGPTSearch:false,
            movieResults: null,
            movieNames: null,
            movieId : null,
        },
        reducers:
        {
            toggleAISearch : (state)=>
            {
                state.showGPTSearch=!state.showGPTSearch;
        },
         addGptMovieResult: (state, action) => {
            const { movieNames, movieResults,movieId } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
            state.movieId=movieId;
    },
    }
}
)

export default AISearchSlice.reducer;
export const {toggleAISearch,addGptMovieResult} = AISearchSlice.actions;