import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';

import ItemsCardItem from '../items/ItemsCardItem';

const ItemsCard = props => {
  const villagerContext = useContext(VillagerContext);
  const { dataById, getItemsById, loading } = villagerContext;

  useEffect(() => {
    getItemsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {dataById.variants && (
          <ItemsCardItem
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
        )}
      </Fragment>
    );
  }
};

export default ItemsCard;
