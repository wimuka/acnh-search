import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VillagerContext from '../../context/villager/villagerContext';

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

const SearchResultsItem = ({ name, img, id }) => {
  const villagerContext = useContext(VillagerContext);
  const {
    homeInput,
    getWallpaper,
    getFloor,
    getVilItmByName,
  } = villagerContext;

  //Use custom styling from above
  const classes = useStyles();
  const history = useHistory();

  let itemData = homeInput.find(item =>
    item.uniqueEntryId
      ? item.uniqueEntryId === id
      : item.variants[0].uniqueEntryId === id
  );

  const onCardClick = () => {
    history.push(`/search/${id}`);
    let floor = getFloor(itemData);
    let wallpaper = getWallpaper(itemData);
    localStorage.setItem('item', JSON.stringify(itemData));

    if (itemData.flooring) {
      localStorage.setItem('floor', floor);
      localStorage.setItem('wallpaper', wallpaper);
    }
    let villager = homeInput.find(villager => villager.uniqueEntryId === id);
    if (villager) {
      localStorage.setItem(
        'villagerItems',
        JSON.stringify(villager.furnitureNameList)
      );
      return getVilItmByName(JSON.parse(localStorage.getItem('villagerItems')));
    }
  };

  return (
    <Grid item sm={3} xs={6} id={id} className={classes.root}>
      <Paper className={classes.paper} onClick={() => onCardClick()}>
        <img src={img} className={classes.img} alt='Item Icon' />
        <p className={classes.name}>{name}</p>
      </Paper>
    </Grid>
  );
};

export default SearchResultsItem;
