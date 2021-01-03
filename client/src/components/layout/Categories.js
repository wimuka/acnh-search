import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VillagerContext from '../../context/villager/villagerContext';

import leaf from '../../img/leaf.png';
import villagersImg from '../../img/villagersImg.webp';
import clothing from '../../img/clothing.png';
import diy from '../../img/diy.png';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: '2rem',
  },
  button: {
    '&:hover': {
      transform: 'scale(1.2)',
    },
    padding: theme.spacing(2),
    height: '7rem',
    width: '7rem',
    borderRadius: '50%',
    textAligh: 'center',
    transition: 'transform .3s',
  },
  img: {
    maxWidth: '5rem',
    maxHeight: '5rem',
  },
}));

const Categories = () => {
  //desctructure to get villagers list from context
  const classes = useStyles();
  const history = useHistory();

  const villagerContext = useContext(VillagerContext);
  const {
    getVillagers,
    getClothes,
    getDiy,
    setInput,
    getItems,
    calcPages,
  } = villagerContext;

  const onVillagerClick = async () => {
    await getVillagers();
    history.push('/villagers');
    setInput('');
  };

  const onItemClick = async () => {
    await getItems();
    await calcPages();
    history.push('/items');
    setInput('');
  };

  const onClothesClick = async () => {
    await getClothes();
    await calcPages();
    history.push('/clothes');
    setInput('');
  };

  const onDiyClick = async () => {
    await getDiy();
    await calcPages();
    history.push('/diy');
    setInput('');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={6}>
          <Button
            className={classes.button}
            disableRipple
            onClick={() => onVillagerClick()}
          >
            <img
              src={villagersImg}
              alt='villagers-category'
              className={classes.img}
            />
          </Button>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Button
            className={classes.button}
            disableRipple
            onClick={() => onItemClick()}
          >
            <img src={leaf} alt='leaf-category' className={classes.img} />
          </Button>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Button
            className={classes.button}
            disableRipple
            onClick={() => onClothesClick()}
          >
            <img
              src={clothing}
              alt='clothing-category'
              className={classes.img}
            />
          </Button>
        </Grid>
        <Grid item sm={3} xs={6}>
          <Button
            className={classes.button}
            disableRipple
            onClick={() => onDiyClick()}
          >
            <img src={diy} alt='diy-category' className={classes.img} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
