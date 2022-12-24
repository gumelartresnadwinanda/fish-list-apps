import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/templates/table';
import { GetFishList } from '../utils/service';
import { fishesListHeader } from '../utils/consts';

function Index() {
  const [fishes, setFishes] = useState([]);

  const fetchFishes = async () => {
    const fishesResponse = await GetFishList();
    setFishes(fishesResponse.filter(fish => fish.komoditas));
  }

  const updateDataOnDelete = useCallback((id) => {
    setFishes(fishes => fishes.filter((fish) => fish.uuid !== id));
  }, [])

  const updateDataOnCreate = useCallback((newData) => {
    if (newData) {
      setFishes(fishes => [...fishes, newData]);
    }
  }, [])

  const updateDataOnUpdate = useCallback((updateData) => {
    fetchFishes()
  }, [])

  useEffect(() => {
    fetchFishes();
  }, []);

  return (
    <div>
      <Table
        headers={fishesListHeader} 
        datas={fishes} 
        deleteCallback={updateDataOnDelete} 
        createCallback={updateDataOnCreate} 
        updateCallback={updateDataOnUpdate} 
      />
    </div>
  );
}

export default Index;