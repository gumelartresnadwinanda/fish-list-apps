import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/templates/table';
import { GetFishList } from '../utils/service';
import { cacheName, fishesListHeader } from '../utils/consts';

function Index() {
  const [fishes, setFishes] = useState([]);

  const fetchFishes = async () => {
    const fishesResponse = await GetFishList();
    setFishes(fishesResponse.filter(fish => fish.komoditas));
  }

  const updateDataOnDelete = useCallback(async (id) => {
    await caches.delete(cacheName)
    setFishes(fishes => fishes.filter((fish) => fish.uuid !== id));
  }, [])

  const updateDataOnCreate = useCallback(async (newData) => {
    await caches.delete(cacheName)
    if (newData) {
      setFishes(fishes => [...fishes, newData]);
    }
  }, [])

  const updateDataOnUpdate = useCallback(async () => {
    await caches.delete(cacheName)
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