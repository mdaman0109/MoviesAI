import { createSlice } from "@reduxjs/toolkit";
const AISearchSlice = createSlice(

    {
        name:'ai',
        initialState:{
            showGPTSearch:false,
            movieResults: null,
            movieNames: null,
        },
        reducers:
        {
            toggleAISearch : (state)=>
            {
                state.showGPTSearch=!state.showGPTSearch;
        },
         addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
    },
    }
}
)

export default AISearchSlice.reducer;
export const {toggleAISearch,addGptMovieResult} = AISearchSlice.actions;