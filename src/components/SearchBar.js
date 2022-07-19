import React, { useContext } from 'react';
import { LoginContext } from '../context/Login/LoginContext';
import { filterDrink, filterFood } from '../services';

function SearchBar() {
  const {
    getType,
    textInput,
    typeFilter,
    setApiDrinks,
    setApiFoods,
  } = useContext(LoginContext);

  const search = async () => {
    const location = document.location.href;
    const url = 'http://localhost:3000/';
    const drinks = await filterDrink(typeFilter, textInput);
    const foods = await filterFood(typeFilter, textInput);

    switch (location) {
    case `${url}drinks`:
      setApiDrinks([...drinks.drinks]);
      console.log(drinks.drinks);
      break;
    case `${url}foods`:
      setApiFoods([...foods.meals]);
      console.log(foods.meals);
      break;
    default:
      return 'error';
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="search-radio"
          onClick={ getType }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="search-radio"
          onClick={ getType }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="search-radio"
          onClick={ getType }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ search }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;