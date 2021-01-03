import React, { useReducer, useState } from 'react';
import VillagerContext from './villagerContext';
import villagerReducer from './villagerReducer';

import {
  GET_VILLAGERS,
  GET_DATA_BY_ID,
  CLEAR_STATE,
  SEARCH_BY_HOME_INPUT,
  FILTER_VILLAGERS,
  CLEAR_FILTER,
  CLEAR_ITEMS_FILTER,
  CLEAR_CLOTHES_FILTER,
  CALC_PAGES,
  CALC_FILTERED_PAGES,
  CALC_PAGES_HOME_INPUT,
  GET_DATA,
  GET_ITEMS,
  FILTER_ITEMS,
  FILTER_DIY,
  GET_CLOTHES,
  GET_DIY,
  CLEAR_DIY_FILTER,
  GET_MAT_IMG_BY_NAME,
  GET_IMG_BY_NAME,
  GET_VILLAGER_ITEMS,
  GET_SOURCE,
  SET_LOADING,
} from '../types';

//eslint-disable-next-line
export const regexSymb = /[.*()\\+=\[\]]/;

//Setup initial state
export function VillagerState(props) {
  const initialState = {
    allData: [],
    villagers: [],
    loading: false,
    items: [],
    diy: [],
    diyImg: '',
    filtered: [],
    homeInput: [],
    dataById: [],
    matArr: [],
    vilItmImg: [],
    src: [],
    noOfPages: 1,
  };
  //state - allows to access anything in the state,
  //dispatch - allows to dispatch objects to the reducer
  const [state, dispatch] = useReducer(villagerReducer, initialState);

  //Random state not used with reducer
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [varImg, setVarImg] = useState(null);

  //Helper Functions

  const setVariantImage = async variant => await setVarImg(variant);
  const setOriginalImage = () => setVarImg(null);

  const handlePageChange = value => {
    setPage(value);
  };

  const getWallpaper = vObj => {
    setLoading();
    if (vObj.wallpaper) {
      return state.allData.find(item => item.name === vObj.wallpaper)
        .variants[0].image;
    }
  };

  const getFloor = vObj => {
    setLoading();
    if (vObj.flooring) {
      return state.allData.find(item => item.name === vObj.flooring).variants[0]
        .image;
    }
  };

  //All of the actions

  //Get all data
  const getAllData = async () => {
    setLoading();
    //create helper function to get in url & then fetch it, then response paresed as json
    const fetchData = async url => await fetch(url).then(r => r.json());
    //use Promise.all method to fetch multiple URLs
    //(Promise.all takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. )
    const [items, villagers] = await Promise.all([
      fetchData('/api/items'),
      fetchData('/api/villagers'),
    ]);

    //Create a new array with all sub-array elements concatenated into it
    const allData = [items, villagers].flat();
    dispatch({
      type: GET_DATA,
      payload: allData,
    });
  };

  //Get Villagers

  const getVillagers = async id => {
    setLoading();
    const res = await fetch('api/villagers');
    const data = await res.json();
    dispatch({
      type: GET_VILLAGERS,
      payload: data,
    });
  };

  //Get Items

  const getItems = async id => {
    setLoading();
    const res = await fetch('/api/items');
    const data = await res.json();
    dispatch({
      type: GET_ITEMS,
      payload: data,
    });
  };

  //Get Clothes

  const getClothes = async id => {
    setLoading();
    const res = await fetch('/api/items');
    const data = await res.json();
    dispatch({
      type: GET_CLOTHES,
      payload: data,
    });
  };

  //Get DIY Recipes

  const getDiy = async id => {
    setLoading();
    const res = await fetch('/api/recipes');
    const data = await res.json();
    dispatch({
      type: GET_DIY,
      payload: data,
    });
  };

  //Get data based on id

  const getVillagerById = () => {
    let getById = JSON.parse(localStorage.getItem('villager'));
    dispatch({ type: GET_DATA_BY_ID, payload: getById });
  };

  const getItemsById = () => {
    let getById = JSON.parse(localStorage.getItem('item'));
    dispatch({ type: GET_DATA_BY_ID, payload: getById });
  };

  const getClothesById = () => {
    let getById = JSON.parse(localStorage.getItem('clothes'));
    dispatch({ type: GET_DATA_BY_ID, payload: getById });
  };

  const getDiyById = () => {
    let getById = JSON.parse(localStorage.getItem('diy'));
    dispatch({ type: GET_DATA_BY_ID, payload: getById });
  };

  //Search & get data by name

  const getMatImgByName = props => {
    //Transform Object to Array {{a: 100}} to [["a", 100]]
    const materialsArr = Object.keys(props)
      .map(key => [key, props[key]])
      .flat();
    const replacedArr = materialsArr.map(matItem => {
      if (typeof matItem === 'string') {
        const matObj = state.allData.find(
          item => item.name.toUpperCase() === matItem.toUpperCase()
        );
        return (
          matObj.variants[0].image ||
          matObj.variants[0].storageImage ||
          matObj.variants[0].inventoryImage ||
          matObj.variants[0].albumImage
        );
      } else return matItem;
    });
    localStorage.setItem('materials', JSON.stringify(replacedArr));
    dispatch({ type: GET_MAT_IMG_BY_NAME, payload: replacedArr });
  };

  const setMaterials = () => {
    setLoading();
    const getMat = JSON.parse(localStorage.getItem('materials'));
    dispatch({ type: GET_MAT_IMG_BY_NAME, payload: getMat });
  };

  const getDiyImgByName = props => {
    setLoading();
    const diyObj = state.allData.find(
      item => item.name.toUpperCase() === props.toUpperCase()
    );
    const diyImgs =
      diyObj.variants[0].image ||
      diyObj.variants[0].storageImage ||
      diyObj.variants[0].inventoryImage ||
      diyObj.variants[0].albumImage;
    localStorage.setItem('diyImg', JSON.stringify(diyImgs));
    dispatch({ type: GET_IMG_BY_NAME, payload: diyImgs });
  };

  const setDiyImg = () => {
    setLoading();
    const getImg = JSON.parse(localStorage.getItem('diyImg'));
    dispatch({ type: GET_IMG_BY_NAME, payload: getImg.toString() });
  };

  const getVilItmByName = props => {
    setLoading();
    const vilItemArr = props.split(/\s*;\s*/);
    const replacedArr = vilItemArr.map(vilItem => {
      const itemObj = state.allData.find(
        item => item.name.toUpperCase() === vilItem.toUpperCase()
      );
      return itemObj
        ? itemObj.variants[0].image ||
            itemObj.variants[0].storageImage ||
            itemObj.variants[0].inventoryImage ||
            itemObj.variants[0].albumImage
        : null;
    });
    const filteredArr = replacedArr.filter(item => item != null);
    localStorage.setItem('diyImg', JSON.stringify(filteredArr));
    dispatch({ type: GET_VILLAGER_ITEMS, payload: filteredArr });
  };

  const setVilItems = () => {
    setLoading();
    const getMat = JSON.parse(localStorage.getItem('diyImg'));
    dispatch({ type: GET_VILLAGER_ITEMS, payload: getMat });
  };

  const setSource = prop => {
    dispatch({ type: GET_SOURCE, payload: prop });
  };

  //Search for villagers in Home Search (Home Page)
  const searchByHomeInput = text => {
    setLoading();
    let lowerCase = text.toLowerCase();
    if (lowerCase.match(regexSymb)) {
      console.error(`Regex didn't match`);
    } else {
      dispatch({ type: SEARCH_BY_HOME_INPUT, payload: lowerCase });
    }
  };

  //Filter by name on Villagers page

  const filterByName = text => {
    setLoading();
    let lowerCase = text.toLowerCase();
    if (lowerCase.match(regexSymb)) {
      console.error(`Regex didn't match`);
    } else {
      dispatch({ type: FILTER_VILLAGERS, payload: lowerCase });
    }
  };

  //Filter by name on Items page
  const filterByItemName = text => {
    setLoading();
    let lowerCase = text.toLowerCase();
    if (lowerCase.match(regexSymb)) {
      console.error(`Regex didn't match`);
    } else {
      dispatch({ type: FILTER_ITEMS, payload: lowerCase });
    }
  };

  //Filter by name on Diy page

  const filterByDiyName = text => {
    setLoading();
    let lowerCase = text.toLowerCase();
    if (lowerCase.match(regexSymb)) {
      console.error(`Regex didn't match`);
    } else {
      dispatch({ type: FILTER_DIY, payload: lowerCase });
    }
  };

  //Clear filtered results
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  const clearItemsFilter = () => {
    dispatch({ type: CLEAR_ITEMS_FILTER });
  };
  const clearClothesFilter = () => {
    dispatch({ type: CLEAR_CLOTHES_FILTER });
  };

  const clearDiyFilter = () => {
    dispatch({ type: CLEAR_DIY_FILTER });
  };

  //Clear state when clicking on Home button
  const clearState = () => {
    dispatch({ type: CLEAR_STATE });
  };

  //calculate # of pages
  const calcPages = () => {
    dispatch({ type: CALC_PAGES });
  };

  //Calculate # of pages for filtered villagers, items, clothes, diy
  const calcFilteredPages = () => {
    dispatch({ type: CALC_FILTERED_PAGES });
  };

  //Calculate pages for Results page (from Home search)
  const calcPagesHomeInput = () => {
    dispatch({ type: CALC_PAGES_HOME_INPUT });
  };

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <VillagerContext.Provider
      value={{
        allData: state.allData,
        data: state.data,
        villagers: state.villagers,
        items: state.items,
        diy: state.diy,
        diyImg: state.diyImg,
        filtered: state.filtered,
        noOfPages: state.noOfPages,
        homeInput: state.homeInput,
        dataById: state.dataById,
        matArr: state.matArr,
        vilItmImg: state.vilItmImg,
        src: state.src,
        loading: state.loading,
        page,
        input,
        varImg,
        getAllData,
        getVillagers,
        getItems,
        getClothes,
        getDiy,
        getVillagerById,
        getItemsById,
        getClothesById,
        getMatImgByName,
        getDiyImgByName,
        getVilItmByName,
        getDiyById,
        getWallpaper,
        getFloor,
        clearState,
        clearFilter,
        clearItemsFilter,
        clearClothesFilter,
        clearDiyFilter,
        filterByName,
        filterByItemName,
        filterByDiyName,
        setInput,
        setMaterials,
        setDiyImg,
        setVilItems,
        setSource,
        setLoading,
        setPage,
        calcPages,
        calcFilteredPages,
        calcPagesHomeInput,
        handlePageChange,
        searchByHomeInput,
        setVariantImage,
        setOriginalImage,
      }}
    >
      {props.children}
    </VillagerContext.Provider>
  );
}

export default VillagerState;
