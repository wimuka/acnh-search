import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VillagerContext from '../../context/villager/villagerContext';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
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
}));

const VillagerItem = ({ vName, vImg, id }) => {
  const villagerContext = useContext(VillagerContext);
  const {
    setInput,
    getWallpaper,
    getFloor,
    villagers,
    getVilItmByName,
  } = villagerContext;

  //Use custom styling from above
  const classes = useStyles();
  const history = useHistory();

  let villager = villagers.find(villager => villager.uniqueEntryId === id);

  const onCardClick = () => {
    history.push(`/villagers/${id}`);
    setInput('');
    localStorage.setItem('villager', JSON.stringify(villager));
    localStorage.setItem(
      'villagerItems',
      JSON.stringify(villager.furnitureNameList)
    );
    getVilItmByName(JSON.parse(localStorage.getItem('villagerItems')));
    if (villager.flooring) {
      const floor = getFloor(villager);
      const wallpaper = getWallpaper(villager);
      localStorage.setItem('floor', floor);
      localStorage.setItem('wallpaper', wallpaper);
    }
  };
  return (
    <Grid item sm={3} xs={4} id={id}>
      <Paper className={classes.paper} onClick={() => onCardClick()}>
        <img src={vImg} className={classes.img} alt='Villager icon' />
        <p className={classes.name}>{vName}</p>
      </Paper>
    </Grid>
  );
};

export default VillagerItem;
