import { createSlice } from "@reduxjs/toolkit";

export const reveiwSlice =createSlice({
    name:"reviews" ,
    initialState:{
        reviews:[]
    },
    reducers:{
        setReview: (state, action) => {
            state.reviews = action.payload;
          },
          addReview: (state, action) => {
           state.reviews.push(action.payload);
          },
          updateReview: (state, action) => {
           state.reviews= state.reviews.map((review ,i) => {
              if (review.review_id == action.payload.review_id) {
                review.review = action.payload.review;
               
              }
              return review
            });
          },
          deleteReviewById: (state, action) => {
            state.reviews=state.reviews.filter((review) => {
            return review.review_id !== action.payload;
            }
            
            );
           
          },
    }
})



export const {
    setReview,addReview,updateReview,deleteReviewById
}=reveiwSlice.actions

export default reveiwSlice.reducer