import SteinStore from "stein-js-client";
const store = new SteinStore(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4`);

export const GetFishList = () => {
  return store.read('list');
}

export const EditFishList = (search, set) => {
  return store.edit('list', { search, set });
}

export const AddFishList = (data) => {
  return store.append('list', [data]);
}

export const DeleteFishList = (condition) => {
  return store.delete('list', condition);
}

export const GetFishSize = () => {
  return store.read('option_size');
}

export const GetFishArea = () => {
  return store.read('option_area');
}
