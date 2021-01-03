import React, { Fragment, useContext, useEffect } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import diyCard from '../../img/diy.png';
import bell from '../../img/bell.png';

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
  name: {
    justifyContent: 'center',
    marginTop: '3rem',
    textTransform: 'uppercase',
  },
  heading: {
    color: '#278ec1',
    fontSize: '2em',
    fontWeight: '700',
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Titillium Web',
    fontSize: '1.1em',
    width: '20rem',
  },
  pricingGrid: {
    marginTop: '2rem',
  },
  pricingSpan: {
    color: '#f6b63a',
    backgroundColor: '#99bcdb1c',
    padding: '0.1rem',
    borderRadius: '0.4rem',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
    },
  },
  pricingCoins: {
    width: '1rem',
  },
  sourceNotes: {
    textAlign: 'center',
    fontFamily: 'Titillium Web',
    fontSize: '1.1rem',
  },
  materialsContainer: {
    justifyContent: 'center',
  },
  imgContainer: {
    justifyContent: 'center',
  },
  diyIcon: {
    width: '2rem',
    justifyContent: 'center',
  },
  imgGridCont: {
    display: 'flex',
    justifyContent: 'center',
  },
  diyItemImg: {
    width: '8rem',
  },
  materials: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '1rem',
    },
  },
  matNum: {
    padding: '1rem 0',
  },
  matImg: {
    width: '3rem',
  },
}));

const DiyCardItem = ({ name, category, id, sell, source, sourceNotes }) => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const { setMaterials, setDiyImg, matArr, diyImg } = villagerContext;

  useEffect(() => {
    setMaterials();
    setDiyImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment key={id}>
      <Grid className={classes.root}>
        <Grid container className={classes.name}>
          <Typography className={classes.heading} variant='h2'>
            {name} DIY
          </Typography>
        </Grid>
        {
          <Paper className={classes.topPaper}>
            <Grid container className={classes.imgContainer}>
              <Grid item sm={5} xs={12} className={classes.imgGridCont}>
                <Grid item sm={2} xs={1}>
                  <img
                    src={diyCard}
                    alt='DIY Card Icon'
                    className={classes.diyIcon}
                  />
                </Grid>
                <Grid item sm={8} xs={6} className={classes.imgContainer}>
                  {typeof diyImg === 'string' ? (
                    <img
                      src={diyImg}
                      alt='Item Icon'
                      className={classes.diyItemImg}
                    />
                  ) : (
                    'Not Working'
                  )}
                </Grid>
              </Grid>
              <Grid item sm={7} xs={12}>
                <Typography className={classes.body}>
                  Category: {category}
                </Typography>
                <Typography className={classes.body}>
                  Source:
                  {` ${source}`}
                </Typography>
                <Typography variant='body1' className={classes.body}>
                  SELL:{' '}
                  <span className={classes.pricingSpan}>
                    <img
                      src={bell}
                      alt='bell coin icon'
                      className={classes.pricingCoins}
                    />
                    {` ${sell}`}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.materialsContainer}>
              <Grid item>
                <Typography className={classes.materials}>
                  {matArr.length > 0
                    ? matArr.map((item, index) =>
                        typeof item === 'string' ? (
                          <img
                            className={classes.matImg}
                            src={item}
                            key={`${id} + ${index}`}
                            alt={`Materials for ${name} DIY`}
                          />
                        ) : (
                          <span
                            className={classes.matNum}
                            key={`${id} + ${index}`}
                          >
                            {item}
                          </span>
                        )
                      )
                    : null}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        }
        {
          <Grid container variant='body1' className={classes.pricingGrid}>
            <Grid item xs={12}>
              <Typography className={classes.sourceNotes}>
                {sourceNotes ? sourceNotes : null}
              </Typography>
            </Grid>
          </Grid>
        }
      </Grid>
    </Fragment>
  );
};

export default DiyCardItem;
