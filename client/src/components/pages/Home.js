import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VillagerContext from '../../context/villager/villagerContext';

import HomeSearch from '../layout/HomeSearch';
import Categories from '../layout/Categories';

const Home = () => {
  const villagerContext = useContext(VillagerContext);
  const { setPage, clearState } = villagerContext;
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('villager');
    localStorage.removeItem('villagerItems');
    localStorage.removeItem('floor');
    localStorage.removeItem('wallpaper');
    localStorage.removeItem('item');
    localStorage.removeItem('clothes');
    localStorage.removeItem('diy');
    localStorage.removeItem('diyImg');
    localStorage.removeItem('materials');

    setPage(1);
    clearState();
    history.push('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HomeSearch />
      <Categories />
    </div>
  );
};

export default Home;
