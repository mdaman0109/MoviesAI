import { createSlice } from "@reduxjs/toolkit";
const AISearchSlice = createSlice(

    {
        name:'ai',
        initialState:{
            showGPTSearch:false
        },
        reducers:
        {
            toggleAISearch : (state)=>
            {
                state.showGPTSearch=!state.showGPTSearch;
        }
    }
}
)

export default AISearchSlice.reducer;
export const {toggleAISearch} = AISearchSlice.actions;