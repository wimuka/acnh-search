import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import { itemsPerPage } from '../layout/Pages';

import VillagerItem from './VillagerItem';
import Search from '../layout/Search';
import Pages from '../layout/Pages';
import Spinner from '../layout/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Titillium Web',
  },
  img: {
    width: '5rem',
    height: '5rem',
  },
  name: {
    margin: '0',
  },
  pagination: {
    justifyContent: 'center',
    padding: '1rem',
  },
  search: {
    marginTop: '2rem',
  },
}));

const Villagers = () => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const {
    villagers,
    getVillagers,
    getAllData,
    filtered,
    loading,
    clearFilter,
    page,
    noOfPages,
  } = villagerContext;

  useEffect(() => {
    getVillagers();
    getAllData();
    clearFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Search classes={{ root: classes.search }} />
        <Grid
          container
          spacing={2}
          style={{ paddingTop: '2rem' }}
          className={classes.root}
        >
          {filtered.length > 0
            ? filtered
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(villager => (
                  <VillagerItem
                    id={villager.uniqueEntryId}
                    vName={villager.name}
                    vImg={villager.iconImage}
                    key={villager.uniqueEntryId}
                  />
                ))
            : noOfPages === 0 && filtered.length === 0
            ? 'Not Found'
            : villagers
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(villager => (
                  <VillagerItem
                    id={villager.uniqueEntryId}
                    vName={villager.name}
                    vImg={villager.iconImage}
                    key={villager.uniqueEntryId}
                  />
                ))}
        </Grid>
        <Pages />
      </Fragment>
    );
  }
};

export default Villagers;
