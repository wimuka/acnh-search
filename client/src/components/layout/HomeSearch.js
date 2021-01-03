import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import VillagerContext from '../../context/villager/villagerContext';

const useStyles = makeStyles(theme => ({
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
}));

const HomeSearch = props => {
  const history = useHistory();
  const classes = useStyles();

  //bring in context (state)
  const villagerContext = useContext(VillagerContext);
  //desctructure to get villagers list from context
  const {
    searchByHomeInput,
    getAllData,
    calcPagesHomeInput,
    setInput,
    homeInput,
    input,
  } = villagerContext;

  const { icon } = props;
  const text = useRef('');

  useEffect(() => {
    if (homeInput === []) {
      text.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async () => {
    await getAllData();
    await searchByHomeInput(input);
    await calcPagesHomeInput();
    history.push('/search');
    setInput('');
  };

  const onChange = e => {
    setInput(e.target.value);
  };

  const handleKeyDown = async e => {
    if (e.keyCode === 13) {
      history.push('/search');
      return await onClick();
    }
  };

  return (
    <div className={classes.divCenter} onKeyDown={handleKeyDown}>
      <Paper component='form' className={classes.root}>
        <InputBase
          placeholder='Search for something'
          type='text'
          inputRef={text}
          onChange={onChange}
          className={classes.inputText}
        />
        <IconButton disableRipple onClick={onClick}>
          <i className={icon} />
        </IconButton>
      </Paper>
    </div>
  );
};

HomeSearch.propTypes = {
  icon: PropTypes.string,
};

HomeSearch.defaultProps = {
  icon: 'las la-search',
};

export default HomeSearch;
