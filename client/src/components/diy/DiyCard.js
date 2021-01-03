import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';

import DiyCardItem from '../diy/DiyCardItem';

const DiyCard = props => {
  const villagerContext = useContext(VillagerContext);
  const { dataById, getDiyById, loading } = villagerContext;

  useEffect(() => {
    getDiyById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {dataById && (
          <DiyCardItem
            name={dataById.name}
            id={dataById.uniqueEntryId}
            category={dataById.category}
            sell={dataById.sell}
            source={dataById.source}
            sourceNotes={dataById.sourceNotes}
            materials={dataById.materials}
          />
        )}
      </Fragment>
    );
  }
};

export default DiyCard;
