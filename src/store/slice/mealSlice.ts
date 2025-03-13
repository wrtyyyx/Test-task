import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string | null;
    strYoutube?: string | null;
    ingredients: { ingredient: string; measure: string }[];
}

const initialState: { favorites: Meal[] } = {
    favorites: [],
};

const mealSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        addFav: (state, action: PayloadAction<Meal>) => {
            const exists = state.favorites.some((meal) => meal.idMeal === action.payload.idMeal);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFav: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((meal) => meal.idMeal !== action.payload);
        },
        clearFav: (state) => {
            state.favorites = [];
        },
    },
});

export const { addFav, removeFav, clearFav } = mealSlice.actions;
export default mealSlice.reducer;
