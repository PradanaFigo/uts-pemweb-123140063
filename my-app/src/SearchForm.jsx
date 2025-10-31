import React, { useState } from 'react';

const SearchForm = ({ categories, areas, onSearch, onRandom, loadingRandom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory, selectedArea);
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCategory('');
    setSelectedArea('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchTerm('');
    setSelectedArea('');
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-layout">
        <div className="form-group">
          <label htmlFor="search">Nama Resep</label>
          <input
            id="search"
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="area">Area/Country</label>
          <select id="area" value={selectedArea} onChange={handleAreaChange}>
            <option value="">-- Pilih Area --</option>
            {areas.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit">Cari</button>
          <button 
            type="button" 
            className="random-button"
            onClick={onRandom}
            disabled={loadingRandom}
          >
            {loadingRandom ? <div className="btn-loader"></div> : 'Resep Acak'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
