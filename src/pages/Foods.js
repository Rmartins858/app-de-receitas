import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FoodCategories from '../components/FoodCategories';
import { RecipesContext } from '../context/RecipesContext';
import { fetchDataFoods,
  // filterFoodByCategory,
} from '../services';
import './Foods.css';

function Foods() {
  const { apiFoods,
    setApiFoods,
    // activeFoodCategory,
  } = useContext(RecipesContext);
  const [foods, setFoods] = useState();
  const navigate = useHistory();

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetchDataFoods();
      console.log(response);
      setApiFoods(response);
    };
    fetchFood();
  }, [setApiFoods]);

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     const response = await filterFoodByCategory(activeFoodCategory);
  //     console.log(response);
  //     setApiFoods(response.meals);
  //   };
  //   fetchCategory();
  // }, [activeFoodCategory]);

  useEffect(() => {
    const NUMBER_OF_FOODS = 12;
    if (apiFoods.length > 1) {
      const foodsSliced = apiFoods.slice(0, NUMBER_OF_FOODS);
      setFoods(
        foodsSliced.map((obj, index) => (
          <Link to={ `/foods/${obj.idMeal}` } key={ index }>
            <div
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <h2 data-testid={ `${index}-card-name` }>{`${obj.strMeal}`}</h2>
              <img
                className="imgCard"
                src={ `${obj.strMealThumb}` }
                alt={ `${obj.strMeal}` }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>)),
      );
    } else if (apiFoods.length === 1) {
      navigate.push(`/foods/${apiFoods[0].idMeal}`);
    } else {
      return <h1>No results</h1>;
    }
  }, [apiFoods, navigate]);

  return (
    <div className="container-foods">
      <Header title="Foods" search />
      <FoodCategories />
      <section className="Foods-container">
        {foods}
      </section>
      <Footer />
    </div>
  );
}
export default Foods;
