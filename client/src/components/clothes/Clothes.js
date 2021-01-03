import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import ClothesItem from './ClothesItem';

import { itemsPerPage } from '../layout/Pages';
import Spinner from '../layout/Spinner';
import Search from '../layout/Search';
import Pages from '../layout/Pages';

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

const Clothes = () => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const {
    items,
    getClothes,
    getAllData,
    filtered,
    clearClothesFilter,
    calcPages,
    page,
    noOfPages,
    setOriginalImage,
    loading,
  } = villagerContext;

  useEffect(() => {
    getClothes();
    getAllData();
    calcPages();
    clearClothesFilter();
    setOriginalImage();
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
                .map(item => (
                  <ClothesItem
                    id={item.variants[0].uniqueEntryId}
                    name={item.name}
                    img={
                      item.variants[0].image ||
                      item.variants[0].storageImage ||
                      item.variants[0].inventoryImage ||
                      item.variants[0].albumImage
                    }
                    key={item.variants[0].uniqueEntryId}
                  />
                ))
            : noOfPages === 0 && filtered.length === 0
            ? 'Not Found'
            : items
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(item => (
                  <ClothesItem
                    id={item.variants[0].uniqueEntryId}
                    name={item.name}
                    img={
                      item.variants[0].image ||
                      item.variants[0].storageImage ||
                      item.variants[0].inventoryImage ||
                      item.variants[0].albumImage
                    }
                    key={item.variants[0].uniqueEntryId}
                  />
                ))}
        </Grid>
        <Pages />
      </Fragment>
    );
  }
};

export default Clothes;
