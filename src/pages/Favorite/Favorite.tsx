import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { RootState } from "../../store";

interface Ingredient {
    ingredient: string;
    measure: string;
}

interface Meal {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strCategory: string;
    ingredients: Ingredient[];
}

const Favorite = () => {
    const favorites = useSelector((state: RootState) => state.meals.favorites) as Meal[];

    const allIngredients = favorites.reduce<{ ingredient: string; measure: string }[]>((acc, meal) => {
        meal.ingredients.forEach(({ ingredient, measure }: { ingredient: string; measure: string }) => {
            const existing = acc.find((item) => item.ingredient === ingredient);
            if (existing) {
                existing.measure += `, ${measure}`;
            } else {
                acc.push({ ingredient, measure });
            }
        });
        return acc;
    }, []);


    return (
        <div>
            <h1>Favorite Meals</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {favorites.map((meal) => (
                    <Card data={meal} key={meal.idMeal} />
                ))}
            </div>
            <h2>Ingredients List</h2>
            <ul>
                {allIngredients.map((item, index) => (
                    <li key={index}>{item.ingredient}: {item.measure}</li>
                ))}
            </ul>
            <h2>Cooking Instructions</h2>
            {favorites.map((meal) => (
                <div key={meal.idMeal}>
                    <h3>{meal.strMeal}</h3>
                    <p>{meal.strInstructions}</p>
                </div>
            ))}
        </div>
    );
};

export default Favorite;
