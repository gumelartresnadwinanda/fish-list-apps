import React, { useState, useEffect, memo } from 'react';
import { titleMapping } from '../../utils/consts';
import { Button } from '../atoms/button';

function Filter({ onCancel, onFilter, availableFilters, selectedFilter }) {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    setFilters(selectedFilter);
    if (selectedFilter) {
      const currentActiveFilter = Object.keys(selectedFilter).reduce((acc, val) => {
        selectedFilter?.[val].forEach(element => {          
          acc.push(element)
        });
        return acc;
      }, [])
      setActiveFilters(currentActiveFilter)
    }
  }, [selectedFilter, availableFilters])
  
  if (!availableFilters) return null;
  
  const handleSave = () => {
    if (onFilter) onFilter(filters);
  }

  const handleActiveFilter = (parent, child) => {
    const currentFilter = [...activeFilters];
    const filterObject = {...filters};
 
    if (filterObject[parent]) {
      if (filterObject[parent].includes(child)) {
        const index = filterObject[parent].findIndex(item => item === child);
        filterObject[parent].splice(index, 1);
        if (filterObject[parent].length === 0) delete filterObject[parent];
      } else {
        filterObject[parent].push(child);
      }
    } else {
      filterObject[parent] = [child]
    }
    setFilters(filterObject);

    if (activeFilters.includes(child)) {
      setActiveFilters(currentFilter.filter((act) => act !== child))
    } else {
      currentFilter.push(child)
      setActiveFilters(currentFilter)
    }
  }

  const renderFilterItems = (parent, data, index) => {
    return (
      <div
        onClick={() => handleActiveFilter(parent, data)}
        key={`item-${index}`}
        className={`filter-items ${activeFilters.includes(data) ? 'active' : ''}`}>
          {data}
      </div>
    )
  }

  const renderFilterSections = (title, index) => {
    return (
      <section className="filter-sections" key={`section-${index}`}>
        <div className="filter-title">{titleMapping[title]}</div>
        <div className="filter-items-container">
          {
            availableFilters[title].map((item, idx) => renderFilterItems(title, item, idx))
          }
        </div>
      </section>
    )
  }

  return (
    <div className="container">
      {Object.keys(availableFilters).map((title, index) => renderFilterSections(title, index))}
      <div className="button-container">
        <Button rounded displayType="tertiery-outline" text="Cancel" onClick={onCancel} />
        <Button rounded displayType="primary" text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}

export default memo(Filter);
