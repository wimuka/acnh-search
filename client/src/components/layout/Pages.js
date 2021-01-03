import React, { useContext } from 'react';
import VillagerContext from '../../context/villager/villagerContext';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pagination: {
    justifyContent: 'center',
    padding: '1rem',
  },
}));

export const itemsPerPage = 16;

const Pages = () => {
  const classes = useStyles();
  const villagerContext = useContext(VillagerContext);
  const { setPage, page, noOfPages } = villagerContext;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box component='span'>
      <Pagination
        shape='rounded'
        count={noOfPages}
        page={page}
        classes={{ ul: classes.pagination }}
        onChange={handlePageChange}
        defaultPage={1}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pages;
