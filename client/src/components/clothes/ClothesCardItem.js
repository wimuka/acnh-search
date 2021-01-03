import React, { Fragment, useContext } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import bell from '../../img/bell.png';
import bellSmall from '../../img/bellSmall.png';

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
    width: '8rem',
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
  variants: {
    textAlign: 'center',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0',
    },
  },
  variantSize: {
    width: '5rem',
  },
  pricingGrid: {
    marginTop: '2rem',
  },
  pricingBody: {
    textAlign: 'center',
    color: '#278ec1',
    fontSize: '1.2em',
    fontWeight: '700',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      marginTop: '0.7rem',
    },
  },
  pricingSpan: {
    color: '#f6b63a',
    backgroundColor: '#99bcdb1c',
    padding: '0.4rem',
    borderRadius: '0.4rem',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
    },
  },
  sourceSpan: {
    backgroundColor: 'transparent',
    color: '#f6b63a',
  },
  pricingCoins: {
    width: '1rem',
  },
}));

const ClothesCardItem = ({
  name,
  img,
  diy,
  customization,
  size,
  interactive,
  outdoor,
  variants,
  themes,
  buy,
  sell,
  source,
  id,
}) => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const { setVariantImage, varImg } = villagerContext;

  return (
    <Fragment key={id}>
      <Grid className={classes.root}>
        <Grid container className={classes.name}>
          <Typography className={classes.heading} variant='h2'>
            {name}
          </Typography>
        </Grid>
        <Paper className={classes.topPaper}>
          <Grid container>
            <Grid item sm={6} xs={12} className={classes.imgIcon}>
              {varImg ? (
                <img
                  src={varImg}
                  alt='Variant Item Color'
                  className={classes.imgIcon}
                />
              ) : (
                <img src={img} alt='Item Icon' className={classes.imgIcon} />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant='body1' className={classes.body}>
                Craftable: {diy ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body1' className={classes.body}>
                Customization: {customization.length > 1 ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body1' className={classes.body}>
                Interactive: {interactive ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body1' className={classes.body}>
                Outdoor: {outdoor ? 'Yes' : 'No'}
              </Typography>
              {size ? (
                <Typography variant='body1' className={classes.body}>
                  Size: {size}
                </Typography>
              ) : null}
              {themes.length >= 1 ? (
                <Typography variant='body1' className={classes.body}>
                  Theme:
                  {themes.map((theme, i) => {
                    if (i === 0 && themes.length <= 1) {
                      return ` ${theme}`;
                    } else if (themes.length > 1 && i) {
                      return ` ${theme}`;
                    } else {
                      return ` ${theme}, `;
                    }
                  })}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
        <Grid container variant='body1' className={classes.pricingGrid}>
          <Grid item xs={12} sm>
            <Typography className={classes.pricingBody}>
              BUY:{' '}
              <span className={classes.pricingSpan}>
                <img
                  src={bellSmall}
                  alt='bell pouch icon'
                  className={classes.pricingCoins}
                />
                {buy >= 0 ? ` ${buy}` : ' N/A'}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant='body1' className={classes.pricingBody}>
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
          <Grid item xs={12} sm={5}>
            <Typography variant='body1' className={classes.pricingBody}>
              SOURCE: <span className={classes.sourceSpan}>{source}</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.topMargin} justify='center'>
          {variants.length > 1
            ? variants.map((variant, index) => (
                <Grid
                  item
                  sm={2}
                  xs={3}
                  className={classes.variants}
                  key={index}
                  onClick={() => setVariantImage(variant.storageImage)}
                >
                  <img
                    src={variant.storageImage}
                    alt='Item Variant Color'
                    className={classes.variantSize}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ClothesCardItem;
