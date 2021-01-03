import React, { useContext, Fragment } from 'react';
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

const DiyItem = ({ id, name, img, source }) => {
  const villagerContext = useContext(VillagerContext);
  const { setInput, diy, getMatImgByName, getDiyImgByName } = villagerContext;

  //Use custom styling from above
  const classes = useStyles();
  const history = useHistory();

  let diyFind = diy.find(item => item.uniqueEntryId === id);
  let materials = diy.find(item => item.name === name);

  const onCardClick = async () => {
    setInput('');
    localStorage.setItem('diy', JSON.stringify(diyFind));
    localStorage.setItem('materials', JSON.stringify(materials.materials));
    localStorage.setItem('diyImg', JSON.stringify(name));
    getMatImgByName(JSON.parse(localStorage.getItem('materials')));
    getDiyImgByName(JSON.parse(localStorage.getItem('diyImg')));
    history.push(`/diy/${id}`);
  };

  return (
    <Fragment key={id}>
      <Grid item sm={3} xs={4} id={id} className={classes.root}>
        <Paper className={classes.paper} onClick={() => onCardClick()}>
          <img src={img} className={classes.img} alt='DIY icon' />
          <p className={classes.name}>{name}</p>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default DiyItem;
