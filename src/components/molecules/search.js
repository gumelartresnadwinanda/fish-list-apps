import React, { useState } from 'react';
import { Button } from '../atoms/button';
import Input from '../atoms/input';
import clear from '../../close.png';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = ({ value }) => {
    setSearchTerm(value);
  }

  const handleClear = () => {
    setSearchTerm('');
  }

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  
  return (
    <div className='search-bar-container'>
      <div className='position-relative'>
        <Input 
          type="text" 
          value={searchTerm} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
          className="pr-32"  
        />
        {
          searchTerm?.length > 0 && (
            <span className='clear' onClick={handleClear}>
              <img src={clear} width={16} height={16} alt="clear" />
            </span>
          )
        }
      </div>
      <Button 
        displayType="secondary" 
        rounded 
        onClick={handleSearch} 
        text="Search" 
      />
    </div>
  );
}

export default SearchBar;
