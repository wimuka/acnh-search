import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import ClothesCardItem from '../clothes/ClothesCardItem';

const ClothesCard = props => {
  const villagerContext = useContext(VillagerContext);
  const { dataById, getClothesById } = villagerContext;

  useEffect(() => {
    getClothesById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {dataById.variants && (
        <ClothesCardItem
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
};

export default ClothesCard;
