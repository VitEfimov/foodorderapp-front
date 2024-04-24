import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ItemCard from "../../components/ItemCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRestaurants } from "../../actions/restaurantActions";
import { listCuisines } from "../../actions/cuisineActions";
import { listCategories } from "../../actions/categoryActions";
import AlertMessage from "../../components/AlertMessage";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router";
import ItemsList from "../../components/ItemList";


const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [restaurantsList, setRestaurantsList] = useState();

  //added
  const [categoriesList, setCategoriesList] = useState();
  const [cuisinesList, setCuisinesList] = useState();
  //

  const listOfRestaurants = useSelector((state) => state.restaurantList);

  //added
  const listOfCategories = useSelector((state) => state.categoryList);
  const listOfCuisines = useSelector((state) => state.cuisineList);
  //

  const { loadingRestaurants, restaurants } = listOfRestaurants;

  //added
  const { loadingCategories, categories } = listOfCategories;
  const { loadingCuisines, cuisines } = listOfCuisines;
  //

  const userLogin = useSelector((state) => state.login);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/");
      dispatch(listRestaurants());

      //added
      dispatch(listCategories());
      dispatch(listCuisines());
      //

    } else {
      navigate("/login");
    }
  }, [])


  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      console.log(restaurants);
      setRestaurantsList(restaurants);
    }

    //added
    if (cuisines && cuisines.length > 0) {
      console.log(cuisines);
      setCuisinesList(cuisines);
    }
    if (categories && categories.length > 0) {
      console.log(categories);
      setCategoriesList(categories);
    }
    //

  });

  return (
    <>
      {/* Added */}
      <ItemsList
        items={cuisines} itemName="cuisine" loading={loadingCuisines} allertMessage="No cuisines to display" header="Try new cuisine"
      />
      <ItemsList
        items={categories}
        itemName="category"
        loading={loadingCategories}
        allertMessage="No categories to display"
        header="Get inspiration for your order"
      />

      {/*---------------------------------------------------------- */}
      {loadingRestaurants && <Spinner animation="grow" />}
      {restaurantsList && restaurantsList.length === 0 && (
        <AlertMessage variant="info" message="No restaurants to display" />
      )}
      {restaurantsList && (
        <div className="container-fluid">
          <h4>Available restaurants</h4>
          <Row className="g-4">
            {restaurantsList.map((restaurant) => (
              <Col key={restaurant.id} md={6} sm={12} lg={4}>
                <ItemCard item={restaurant} itemName="restaurant" />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default HomePage;
