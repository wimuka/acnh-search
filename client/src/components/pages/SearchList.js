import React, { Fragment, useContext } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import SearchResults from '../search/SearchResults';
import Home from './Home';

const SearchList = () => {
  const villagerContext = useContext(VillagerContext);
  const { homeInput } = villagerContext;
  return (
    <Fragment>{homeInput.length > 0 ? <SearchResults /> : <Home />}</Fragment>
  );
};

export default SearchList;
