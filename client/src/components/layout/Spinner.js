import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ margin: 'auto', paddingTop: '13rem', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
