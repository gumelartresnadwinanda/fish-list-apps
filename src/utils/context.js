import React, { useState, useEffect } from 'react';
import { GetFishSize, GetFishArea } from '../utils/service';

const VariableContext = React.createContext({});

const VariableProvider = (props) => {
  const [sizes, setSizes] = useState([]);
  const [areas, setAreas] = useState([]);

  const fetchSizes = async () => {
    const sizesResult = await GetFishSize();
    const formattedSized = sizesResult.map((size) => {
      const result = {
        label: size.size,
        value: size.size
      }
      return result;
    })
    setSizes(formattedSized);
  }

  const fetchAreas = async () => {
    const areaResults = await GetFishArea();
    const formattedArea = areaResults.reduce((acc, val) => {
      if (val.city && val.province) {
        const result = {
          label: `${val.city} - ${val.province}`,
          value: `${val.city} - ${val.province}`
        };
        acc.push(result);
      }
      return acc;
    }, [])
    setAreas(formattedArea);
  }

  useEffect(() => {
    fetchSizes();
    fetchAreas();
  }, [])

  return (
    <VariableContext.Provider 
      value={{
        sizes,
        areas
      }}
    >
      {props.children}
    </VariableContext.Provider>
  )
}

export {
  VariableContext,
  VariableProvider
}