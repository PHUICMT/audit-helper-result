import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import PageTabs from '../tabs/PageTabs';

function PageHeader() {
  const { title } = "Audit Helper Result";

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

export default PageHeader;