import React, { useContext, useEffect, useRef } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import VillagerContext from '../../context/villager/villagerContext';

const useStyles = {
  root: {
    padding: '1px 8px',
    width: '35rem',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5rem',
  },

  divCenter: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2 rem 0',
  },
  inputText: {
    fontFamily: 'Ubuntu',
    fontWeight: '300',
  },
};

const Search = props => {
  //bring in context (state)
  const villagerContext = useContext(VillagerContext);
  //desctructure to get villagers list from context
  const {
    filterByName,
    filterByItemName,
    filterByDiyName,
    filtered,
    clearFilter,
    clearItemsFilter,
    clearDiyFilter,
    calcFilteredPages,
    page,
    items,
    setPage,
    villagers,
    diy,
  } = villagerContext;
  const { classes } = props;
  const text = useRef('');

  useEffect(() => {
    if (filtered === []) {
      text.current.value = '';
    }
  });

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const onChange = e => {
    e.preventDefault();
    if (villagers.length > 0) {
      if (text.current.value !== '' && page !== 1) {
        setPage(1);
        filterByName(e.target.value);
        calcFilteredPages();
      } else if (text.current.value !== '') {
        filterByName(e.target.value);
        calcFilteredPages();
      } else {
        clearFilter();
        setPage(1);
      }
    } else if (items.length > 0) {
      if (text.current.value !== '' && page !== 1) {
        setPage(1);
        filterByItemName(e.target.value);
        calcFilteredPages();
      } else if (text.current.value !== '') {
        filterByItemName(e.target.value);
        calcFilteredPages();
      } else {
        clearItemsFilter();
        setPage(1);
      }
    } else if (diy.length > 0) {
      if (text.current.value !== '' && page !== 1) {
        setPage(1);
        filterByDiyName(e.target.value);
        calcFilteredPages();
      } else if (text.current.value !== '') {
        filterByDiyName(e.target.value);
        calcFilteredPages();
      } else {
        clearDiyFilter();
        setPage(1);
      }
    }
  };

  return (
    <div className={classes.divCenter} onKeyDown={handleKeyDown}>
      <Paper component='form' className={classes.root}>
        <InputBase
          placeholder='Filter by name'
          type='text'
          onChange={onChange}
          inputRef={text}
          className={classes.inputText}
        />
      </Paper>
    </div>
  );
};

export default withStyles(useStyles)(Search);
