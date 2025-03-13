import { useEffect, useState } from "react";
import { useGetAllMealsQuery, useGetCategoriesQuery, useSearchMealQuery } from "../../store/api/mealApi.ts";
import Pagination from '@mui/material/Pagination';
import Card from "../../components/Card/Card.tsx";

interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
}

const ITEMS_ON_PAGE = 12;

const Main = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

    const { data, isLoading, error } = useGetAllMealsQuery();
    const { data: searchResults } = useSearchMealQuery(search, {
        skip: search.length === 0,
    });
    const { data: categories } = useGetCategoriesQuery();
    console.log(data)
    useEffect(() => {
        if (!data?.meals) return;

        let mealsToShow = searchResults?.meals || data.meals;

        if (selectedCategory !== "All") {
            mealsToShow = mealsToShow.filter(meal => meal.strCategory === selectedCategory);
        }


        setFilteredMeals(mealsToShow);
        setCurrentPage(1);
    }, [searchResults, data, selectedCategory]);

    const startIndex = (currentPage - 1) * ITEMS_ON_PAGE;
    const paginatedMeals = filteredMeals.slice(startIndex, startIndex + ITEMS_ON_PAGE);

    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSearch('');
        setSelectedCategory("All");
        setFilteredMeals(data?.meals || []);
        setCurrentPage(1);
    };

    if (isLoading) return <p>Loading meals...</p>;
    if (error) return <p>Error loading meals!</p>;

    return (
        <div>
            <h1>All Meals</h1>
            <form className="cat_form">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Product name..."
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories?.categories?.map((category) => (
                        <option key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>

                <button className="cat_form_btn" onClick={handleReset}>
                    Reset
                </button>
            </form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {paginatedMeals.map((meal) => (
                    <Card data={meal} key={meal.idMeal} />
                ))}
            </div>
            {filteredMeals.length > ITEMS_ON_PAGE && (
                <Pagination
                    count={Math.ceil(filteredMeals.length / ITEMS_ON_PAGE)}
                    page={currentPage}
                    onChange={handleChangePage}
                />
            )}
        </div>
    );
};

export default Main;
