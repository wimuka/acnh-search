import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';

import VillagerCardItem from '../villagers/VillagerCardItem';

const VillagerCard = props => {
  const villagerContext = useContext(VillagerContext);
  const { dataById, getVillagerById, loading } = villagerContext;

  useEffect(() => {
    getVillagerById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {dataById && (
          <VillagerCardItem
            name={dataById.name}
            img={dataById.iconImage}
            catchphrase={dataById.catchphrase}
            birthday={dataById.birthday}
            species={dataById.species}
            gender={dataById.gender}
            personality={dataById.personality}
            house={dataById.houseImage}
            floor={localStorage.getItem('floor')}
            wallpaper={localStorage.getItem('wallpaper')}
          />
        )}
      </Fragment>
    );
  }
};

export default VillagerCard;
