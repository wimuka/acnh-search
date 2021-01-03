import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Spinner from '../layout/Spinner';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topPaper: {
    marginTop: '2rem',
    padding: '1rem',
    //breakpoint (xs) at which text will be centered. Otherwise it's not centered
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  topMargin: {
    marginTop: '2rem',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  imgIcon: {
    textAlign: 'center',
  },
  name: {
    justifyContent: 'center',
    marginTop: '3rem',
    textTransform: 'uppercase',
  },
  heading: {
    color: '#278ec1',
    fontSize: '3em',
    fontWeight: '700',
  },
  body: {
    fontFamily: 'Titillium Web',
    fontSize: '1.1em',
  },
  house: {
    width: '10rem',
    textAlign: 'center',
    paddingTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0',
    },
  },
  floorWallpaper: {
    textAlign: 'center',
    paddingTop: '3rem',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0',
    },
  },
  itemGrid: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '3rem',
  },
  itemSize: {
    width: '6rem',
  },
}));

const SearchCardVillager = ({
  name,
  img,
  catchphrase,
  birthday,
  species,
  gender,
  personality,
  house,
  wallpaper,
  floor,
  id,
}) => {
  const classes = useStyles();

  const villagerContext = useContext(VillagerContext);
  const { setVilItems, vilItmImg, loading } = villagerContext;

  useEffect(() => {
    setVilItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Grid className={classes.root}>
          <Grid container className={classes.name}>
            <Typography className={classes.heading} variant='h2'>
              {name}
            </Typography>
          </Grid>
          <Paper className={classes.topPaper}>
            <Grid container>
              <Grid item sm={6} xs={12} className={classes.imgIcon}>
                <img src={img} alt='Villager Icon' />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Typography variant='body1' className={classes.body}>
                  Catchpharase: "{catchphrase}"
                </Typography>
                <Typography variant='body1' className={classes.body}>
                  Birthday: {birthday}
                </Typography>
                <Typography variant='body1' className={classes.body}>
                  Personality: {personality}{' '}
                </Typography>
                <Typography variant='body1' className={classes.body}>
                  Species: {species}
                </Typography>
                <Typography variant='body1' className={classes.body}>
                  Gender: {gender}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Grid container>
            <Grid className={classes.itemGrid}>
              <Typography>
                {vilItmImg
                  ? vilItmImg.map((item, index) => (
                      <img
                        src={item}
                        key={`${id} + ${index}`}
                        className={classes.itemSize}
                        alt={`${name}'s Starting Furnitire`}
                      />
                    ))
                  : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.topMargin} justify='center'>
            <Grid item sm={4} xs={12}>
              <img src={house} alt='Villager Icon' className={classes.house} />
            </Grid>
            <Grid item sm={4} xs={12} className={classes.floorWallpaper}>
              <img src={wallpaper} alt='Villager wallpaper' />
            </Grid>
            <Grid item sm={4} xs={12} className={classes.floorWallpaper}>
              <img src={floor} alt='Villager floor' />
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
};

export default SearchCardVillager;
