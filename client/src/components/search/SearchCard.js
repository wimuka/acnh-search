import React, { Fragment, useContext, useEffect } from 'react';

import Spinner from '../layout/Spinner';

import SearchCardVillager from './SearchCardVillager';
import SearchCardItem from './SearchCardItem';
import VillagerContext from '../../context/villager/villagerContext';

const SearchCard = () => {
  const villagerContext = useContext(VillagerContext);
  const { dataById, getItemsById, loading } = villagerContext;

  useEffect(() => {
    getItemsById(localStorage.getItem('item'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {dataById.variants ? (
          <SearchCardItem
            name={dataById.name.toUpperCase()}
            img={
              dataById.variants[0].image ||
              dataById.variants[0].storageImage ||
              dataById.variants[0].inventoryImage ||
              dataById.variants[0].albumImage
            }
            diy={dataById.diy}
            customization={dataById.variants}
            size={dataById.size}
            interactive={dataById.interact}
            outdoor={dataById.outdoor}
            variants={dataById.variants}
            themes={dataById.variants[0].themes}
            buy={dataById.variants[0].buy}
            sell={dataById.variants[0].sell}
            source={dataById.variants[0].source}
            id={dataById.variants[0].uniqueEntryId}
          />
        ) : (
          <SearchCardVillager
            name={dataById.name}
            img={dataById.iconImage}
            catchphrase={dataById.catchphrase}
            birthday={dataById.birthday}
            species={dataById.species}
            gender={dataById.gender}
            personality={dataById.personality}
            diy={dataById.diy}
            house={dataById.houseImage}
            floor={localStorage.getItem('floor')}
            wallpaper={localStorage.getItem('wallpaper')}
            furnitureList={localStorage.getItem('furnitureList')}
          />
        )}
      </Fragment>
    );
  }
};

export default SearchCard;
