import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '20rem',
  },
  paper: {
    '&:hover': {
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('xs')]: {},
    transition: 'transform .3s',
    height: '10rem',
    textAlign: 'center',
    padding: '5px',
  },
  img: {
    width: '5rem',
    height: '5rem',
  },
  name: {
    margin: '0',
  },
}));

const ClothesItem = ({ id, name, img }) => {
  const villagerContext = useContext(VillagerContext);
  const { setInput, items, loading } = villagerContext;

  //Use custom styling from above
  const classes = useStyles();
  const history = useHistory();

  let clothes = items.find(item => item.variants[0].uniqueEntryId === id);

  const onCardClick = () => {
    history.push(`/clothes/${id}`);
    setInput('');
    localStorage.setItem('clothes', JSON.stringify(clothes));
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Grid item sm={3} xs={4} id={id} className={classes.root}>
        <Paper className={classes.paper} onClick={() => onCardClick()}>
          <img src={img} className={classes.img} alt='Item icon' />
          <p className={classes.name}>{name}</p>
        </Paper>
      </Grid>
    );
  }
};

export default ClothesItem;
