import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';
import { itemsPerPage } from '../layout/Pages';

import DiyItem from './DiyItem';
import Search from '../layout/Search';
import Pages from '../layout/Pages';

import diyImg from '../../img/diy.png';

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
  search: {
    marginTop: '2rem',
  },
}));

const Diys = ({ source }) => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const {
    diy,
    getDiy,
    getAllData,
    filtered,
    clearDiyFilter,
    calcPages,
    page,
    noOfPages,
    loading,
  } = villagerContext;

  useEffect(() => {
    getDiy();
    getAllData();
    calcPages();
    clearDiyFilter();

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
                  <DiyItem
                    name={item.name}
                    img={diyImg}
                    id={item.uniqueEntryId}
                    key={item.uniqueEntryId}
                  />
                ))
            : noOfPages === 0 && filtered.length === 0
            ? 'Not Found'
            : diy
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map(item => (
                  <DiyItem
                    name={item.name}
                    img={diyImg}
                    id={item.uniqueEntryId}
                    key={item.uniqueEntryId}
                    source={item.source}
                  />
                ))}
        </Grid>
        <Pages />
      </Fragment>
    );
  }
};

export default Diys;
