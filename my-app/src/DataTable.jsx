import React from 'react';

const PLACEHOLDER_IMAGE = 'https://placehold.co/200x180/FDF8F2/E67E22?text=No+Image';

const DataTable = ({ recipes, onSelectRecipe }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <div 
          className="recipe-card" 
          key={recipe.idMeal} 
          onClick={() => onSelectRecipe(recipe.idMeal)}
        >
          <img 
            src={recipe.strMealThumb || PLACEHOLDER_IMAGE} 
            alt={recipe.strMeal}
            onError={handleImageError}
          />
          <h3>{recipe.strMeal}</h3>
        </div>
      ))}
    </div>
  );
};

export default DataTable;
