import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRestaurants } from "../../actions/restaurantActions";
import { listCuisines } from "../../actions/cuisineActions";
import { listCategories } from "../../actions/categoryActions";
import { useNavigate } from "react-router";

import ItemsList from "../../components/ItemList";

const HomePage2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.login);
    const { userInfo } = userLogin;

    const listOfRestaurants = useSelector((state) => state.restaurantList);
    const listOfCategories = useSelector((state) => state.categoryList);
    const listOfCuisines = useSelector((state) => state.cuisineList);

    const { loading: loadingRestaurants, restaurants } = listOfRestaurants;
    const { loading: loadingCategories, categories } = listOfCategories;
    const { loading: loadingCuisines, cuisines } = listOfCuisines;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
            dispatch(listRestaurants());
            dispatch(listCategories());
            dispatch(listCuisines());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <>
            <ItemsList
                items={cuisines}
                itemName="cuisine"
                loading={loadingCuisines}
                allertMessage="No cuisines to display"
                header="Try new cuisine"
            />
            <ItemsList
                items={categories}
                itemName="category"
                loading={loadingCategories}
                allertMessage="No categories to display"
                header="Get inspiration for your order"
            />

            <ItemsList
                items={restaurants}
                itemName="restaurant"
                loading={loadingRestaurants}
                allertMessage="No restaurants to display"
                header="Avialable restaurants"
            />

        </>
    );
};

export default HomePage2;
