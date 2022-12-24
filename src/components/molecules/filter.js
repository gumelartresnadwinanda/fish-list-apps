import React, { useState, useEffect, memo } from 'react';
import { numberValue, stringValueHeader, titleMapping } from '../../utils/consts';
import { Button } from '../atoms/button';
import Input from '../atoms/input';
import Label from '../atoms/label';

function Filter({ onCancel, onFilter, availableFilters, selectedFilter }) {
  // object formatted active filter
  const [activeFilterObj, setActiveFiltersObj] = useState({});
  // array formatted active filters
  const [activeFiltersarr, setActiveFiltersArr] = useState([]);
  
  // base filter for number
  const [numbersFilter, setNumbersFilter] = useState(null);
  // current data value for number
  const [activeNumbersFilter, setActiveNumbersFilter] = useState(null);

  useEffect(() => {
    if (selectedFilter && Object.keys(selectedFilter).length) {
      let numbers = {};
      let strings = {};
      const currentActiveFilter = Object.keys(selectedFilter).reduce((acc, val) => {
        if (stringValueHeader.includes(val)) {
          selectedFilter?.[val].forEach(element => {          
            acc.push(element)
          });
          strings[val] = selectedFilter[val];
        } else if (numberValue.includes(val)) {
          numbers[val] = selectedFilter[val];
        }
        return acc;
      }, []);
      setActiveFiltersArr(currentActiveFilter);
      setActiveNumbersFilter(JSON.parse(JSON.stringify(numbers)));
      setActiveFiltersObj(strings);
    }
    const numbersOnly = Object.keys(availableFilters).reduce((acc, val) => {
      if (numberValue.includes(val)) {
        acc[val] = availableFilters[val];
      }
      return acc;
    }, {});
    setNumbersFilter(numbersOnly);
    if (!selectedFilter || Object.keys(selectedFilter).length === 0) setActiveNumbersFilter(JSON.parse(JSON.stringify(numbersOnly)));

  }, [selectedFilter, availableFilters])
  
  if (!availableFilters) return null;
  
  const handleSave = () => {
    if (onFilter) onFilter(activeFilterObj, activeNumbersFilter);
  }

  const handleChange = (event, type, parent) => {
    const updateData = {...activeNumbersFilter};
    updateData[parent][type] = Number(event.value);
    setActiveNumbersFilter(updateData)
  }

  const handleActiveFilter = (parent, child) => {
    const currentFilter = [...activeFiltersarr];
    const filterObject = {...activeFilterObj};
 
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
    setActiveFiltersObj(filterObject);

    if (activeFiltersarr.includes(child)) {
      setActiveFiltersArr(currentFilter.filter((act) => act !== child))
    } else {
      currentFilter.push(child)
      setActiveFiltersArr(currentFilter)
    }
  }

  const renderFilterItems = (parent, data, index) => {
    return (
      <div
        onClick={() => handleActiveFilter(parent, data)}
        key={`item-${index}`}
        className={`filter-items ${activeFiltersarr.includes(data) ? 'active' : ''}`}>
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

  const renderNumberFilterSection = (title, index) => (
    <section className="filter-sections" key={`section-${index}`}>
      <div className="filter-title">{titleMapping[title]}</div>
      <div className="filter-input-container"> 
        <Label text="Min">
          <Input 
            name={`${title}-min`} 
            value={activeNumbersFilter?.[title]?.min || 0} 
            type="number" 
            min={numbersFilter?.[title]?.min || 0}
            max={activeNumbersFilter?.[title]?.max || 999999999}
            onChange={(e) => handleChange(e, 'min', title)}
          />
        </Label>
        <Label text="Max">
          <Input 
            name={`${title}-max`} 
            value={activeNumbersFilter?.[title]?.max || 0} 
            type="number" 
            min={activeNumbersFilter?.[title]?.min || 0}
            max={numbersFilter?.[title]?.max || 999999999}
            onChange={(e) => handleChange(e, 'max', title)}
          />
        </Label>
      </div>
    </section>
  )

  return (
    <div className="container">
      {Object.keys(availableFilters).map((title, index) => {
        return stringValueHeader.includes(title) 
        ? renderFilterSections(title, index)
        : renderNumberFilterSection(title, index)
      })}
      <div className="button-container">
        <Button rounded displayType="tertiery-outline" text="Cancel" onClick={onCancel} />
        <Button rounded displayType="primary" text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}

export default memo(Filter);
