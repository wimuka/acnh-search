import React, { Fragment, useContext } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import { itemsPerPage } from '../layout/Pages';
import Spinner from '../layout/Spinner';

import SearchResultsItem from './SearchResultsItem';
import Pages from '../layout/Pages';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Titillium Web',
  },

  paper: {
    '&:hover': {
      transform: 'scale(1.1)',
    },
    transition: 'transform .3s',

    textAlign: 'center',
    padding: theme.spacing(1),
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

const SearchResults = () => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const { homeInput, page, loading } = villagerContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Grid
          container
          spacing={2}
          style={{ paddingTop: '2rem' }}
          className={classes.root}
        >
          {homeInput.length > 0
            ? homeInput
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(item => (
                  <SearchResultsItem
                    id={item.uniqueEntryId || item.variants[0].uniqueEntryId}
                    name={item.name}
                    img={
                      item.iconImage ||
                      item.variants[0].image ||
                      item.variants[0].storageImage ||
                      item.variants[0].inventoryImage ||
                      item.variants[0].albumImage
                    }
                    house={item.houseImage}
                    key={item.uniqueEntryId || item.variants[0].uniqueEntryId}
                  />
                ))
            : 'Not Found'}
        </Grid>
        <Pages />
      </Fragment>
    );
  }
};

export default SearchResults;
