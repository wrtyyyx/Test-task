import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMealQuery } from "../../store/api/mealApi";
import { useEffect, useState } from "react";
import "./Meal.css";
import { addFav } from "../../store/slice/mealSlice";

interface Ingredient {
    ingredient: string;
    measure: string;
}

interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string | null;
    strYoutube?: string | null;
    ingredients: Ingredient[];
}

const Meal = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data } = useGetMealQuery(id || "");
    const [meal, setMeal] = useState<Meal | null>(null);

    useEffect(() => {
        if (data?.meals?.length) {
            const dataMeal = data.meals[0];

            setMeal({
                idMeal: dataMeal.idMeal,
                strMeal: dataMeal.strMeal,
                strCategory: dataMeal.strCategory,
                strArea: dataMeal.strArea,
                strInstructions: dataMeal.strInstructions,
                strMealThumb: dataMeal.strMealThumb,
                strTags: dataMeal.strTags || null,
                strYoutube: dataMeal.strYoutube || null,
                ingredients: Array.from({ length: 20 }, (_, index) => {
                    const ingredientKey = `strIngredient${index + 1}`;
                    const measureKey = `strMeasure${index + 1}`;

                    const ingredient = dataMeal[ingredientKey as keyof typeof dataMeal];
                    const measure = dataMeal[measureKey as keyof typeof dataMeal];

                    return ingredient && typeof ingredient === 'string' ? { ingredient: ingredient.trim(), measure: typeof measure === 'string' ? measure.trim() : "" } : null;
                }).filter((item): item is Ingredient => item !== null),
            });
        }
    }, [data]);

    return (
        <>
            {meal && (
                <div className="container">
                    <button className="back" onClick={() => navigate(-1)}>Go back</button>
                    <button className="favorite" onClick={() => dispatch(addFav(meal))}>Add to favorite</button>
                    <h1 className="title">{meal.strMeal}</h1>
                    <hr />
                    <p className="instruction"><span>Instruction: </span>{meal.strInstructions}</p>
                    <div className="box">
                        <img className="img" width={300} height={300} src={meal.strMealThumb} alt={meal.strMeal} />
                        <ul className="list">
                            {meal.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.ingredient} - {ing.measure}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {meal.strYoutube && (
                        <a className="link" href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                            Watch on YouTube
                        </a>
                    )}
                </div>
            )}
        </>
    );
};

export default Meal;
