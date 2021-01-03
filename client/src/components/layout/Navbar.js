import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import VillagerContext from '../../context/villager/villagerContext';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontWeight: '500',
  },

  button: {
    fontWeight: '500',
  },
  appBar: {
    background: '#f6b63a',
  },
}));

const Navbar = props => {
  const villagerContext = useContext(VillagerContext);
  const { clearState, setPage, setInput } = villagerContext;
  const history = useHistory();
  const classes = useStyles();

  const onHomeClick = async () => {
    await clearState();
    setPage(1);
    history.push('/');
    setInput('');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => onHomeClick()}
          >
            <i className={props.icon} />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {props.title}
          </Typography>
          {/* <Button color='inherit' className={classes.button}>
            Login
          </Button>
          <Button color='inherit' className={classes.button}>
            Sign Up
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'ACNH SEARCH',
  icon: 'las la-leaf',
};

export default Navbar;
