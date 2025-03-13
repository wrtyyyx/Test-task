import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "../pages/Main/Main.tsx";
import Meal from "../pages/Meal/Meal.tsx";
import Favorite from "../pages/Favorite/Favorite.tsx";
import MainLayout from "../tamplate/MainLayout.tsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={':id'} element={<Meal/>}/>
                    <Route path={'/favorite'} element={<Favorite/>}/>
                </Route>

            </Routes>
        </Router>
    );
};

export default AppRouter;
