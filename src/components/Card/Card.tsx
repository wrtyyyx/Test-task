import { useGetMealQuery } from "../../store/api/mealApi";
import {Link} from "react-router-dom";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
}
const Card = ({data}: { data: Meal }) => {
    const { data: mealDetails } = useGetMealQuery(data.idMeal);
    if (!data) return null;

    return (
        <Link to={`${mealDetails?.meals[0]?.idMeal}`} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
            <img src={data.strMealThumb} alt={data.strMeal} style={{ width: "100%", borderRadius: "10px" }} />
            <h3>{data.strMeal}</h3>
            <p><strong>Area:</strong> {mealDetails?.meals[0]?.strArea || "Unknown"}</p>
            <p><strong>Category:</strong> {mealDetails?.meals[0]?.strCategory || "Unknown"}</p>
        </Link>
    );

};

export default Card;