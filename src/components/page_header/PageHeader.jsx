import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import PageTabs from '../tabs/PageTabs';

function PageHeader(props) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          align="left"
          noWrap
        >
          {title}
        </Typography>
      </Toolbar>
      <PageTabs />
    </React.Fragment>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;