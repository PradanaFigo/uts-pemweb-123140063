import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import DetailCard from './DetailCard';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [catRes, areaRes] = await Promise.all([
          fetch(`${API_URL}list.php?c=list`),
          fetch(`${API_URL}list.php?a=list`),
        ]);
        const catData = await catRes.json();
        const areaData = await areaRes.json();
        setCategories(catData.meals || []);
        setAreas(areaData.meals || []);
      } catch {
        setError('Gagal memuat data filter.');
      }
    };
    fetchDropdownData();
  }, []);

  const handleSearch = async (searchTerm, category, area) => {
    setLoadingSearch(true);
    setError(null);
    let url = '';
    
    if (searchTerm) url = `${API_URL}search.php?s=${searchTerm}`;
    else if (category) url = `${API_URL}filter.php?c=${category}`;
    else if (area) url = `${API_URL}filter.php?a=${area}`;
    else {
      setLoadingSearch(false);
      return;
    }
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
      if (!data.meals) setError('Tidak ada resep yang ditemukan.');
    } catch {
      setError('Gagal mengambil data resep.');
    }
    setLoadingSearch(false);
  };

  const handleRandomRecipe = async () => {
    setLoadingRandom(true);
    setError(null);
    setRecipes([]);
    try {
      const res = await fetch(`${API_URL}random.php`);
      const data = await res.json();
      setSelectedRecipe(data.meals[0]);
    } catch {
      setError('Gagal mengambil resep acak.');
    }
    setLoadingRandom(false);
  };

  const handleSelectRecipe = async (id) => {
    setLoadingSearch(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}lookup.php?i=${id}`);
      const data = await res.json();
      setSelectedRecipe(data.meals[0]);
    } catch {
      setError('Gagal mengambil detail resep.');
    }
    setLoadingSearch(false);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app-container">
      <Header />
      <SearchForm
        categories={categories}
        areas={areas}
        onSearch={handleSearch}
        onRandom={handleRandomRecipe}
        loadingRandom={loadingRandom}
      />
      
      {loadingSearch && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Mencari...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2rem' }}>{error}</p>}
      
      <DataTable 
        recipes={recipes} 
        onSelectRecipe={handleSelectRecipe} 
      />
      
      {selectedRecipe && (
        <DetailCard 
          recipe={selectedRecipe} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
