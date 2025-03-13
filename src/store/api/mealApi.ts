import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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

interface MealsResponse {
    meals: Meal[] | null;
}

interface CategoriesResponse {
    categories: { strCategory: string }[]
}

export const mealApi = createApi({
    reducerPath: 'mealApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.themealdb.com/api/json/v1/1',
    }),
    tagTypes: ['Meals'],
    endpoints: (builder) => ({
        getMealsByCategory: builder.query<MealsResponse, string>({
            query: (category) => `/filter.php?c=${category}`,
            providesTags: (result) =>
                result?.meals
                    ? [...result.meals.map(({idMeal}) => ({type: 'Meals' as const, id: idMeal})), {
                        type: 'Meals',
                        id: 'LIST'
                    }]
                    : [{type: 'Meals', id: 'LIST'}],
        }),
        getMeal: builder.query<MealsResponse, string>({
            query: (id) => `/lookup.php?i=${id}`,
            providesTags: (_result, _error, id) => [{type: 'Meals', id}],
        }),

        searchMeal: builder.query<MealsResponse, string>({
            query: (name) => `/search.php?s=${name}`,
            providesTags: (result) =>
                result?.meals
                    ? [...result.meals.map(({idMeal}) => ({type: 'Meals' as const, id: idMeal})), {
                        type: 'Meals',
                        id: 'LIST'
                    }]
                    : [{type: 'Meals', id: 'LIST'}],
        }),
        getAllMeals: builder.query<MealsResponse, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const categoryResp = await fetchWithBQ('/categories.php');

                if (categoryResp.error) {
                    return { error: categoryResp.error };
                }

                const categories: CategoriesResponse = categoryResp.data as CategoriesResponse;
                let allMeals: Meal[] = [];

                for (const category of categories.categories) {
                    const mealRes = await fetchWithBQ(`/filter.php?c=${category.strCategory}`);
                    if (mealRes.data) {
                        const meals = (mealRes.data as MealsResponse).meals?.map(meal => ({
                            ...meal,
                            strCategory: category.strCategory,
                        })) || [];

                        allMeals = [...allMeals, ...meals];
                    }
                }

                return { data: { meals: allMeals } };
            }
        }),


        getCategories: builder.query<CategoriesResponse, void>({
            query: () => `/categories.php`,
            providesTags: [{ type: 'Meals', id: 'LIST' }],
        }),
    }),
});

export const {useGetMealsByCategoryQuery,useGetCategoriesQuery, useGetMealQuery, useSearchMealQuery, useGetAllMealsQuery} = mealApi;
