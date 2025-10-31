import React from 'react';

const getIngredients = (recipeData) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeData[`strIngredient${i}`];
    const measure = recipeData[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ name: ingredient, measure: measure || '' });
    }
  }
  return ingredients;
};

const DetailCard = ({ recipe, onClose }) => {
  const ingredientsList = getIngredients(recipe);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {ingredientsList.map((item, index) => (
            <li key={index}>
              {item.name} <span>{item.measure}</span>
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <pre>{recipe.strInstructions}</pre>
      </div>
    </div>
  );
};

export default DetailCard;
