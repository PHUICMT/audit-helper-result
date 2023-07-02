import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function PageHeader(props) {
  const { title, subtitle } = props;

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 5,
        }}
      >
        <Typography variant="h5" color="inherit" align="left" paddingBottom={2}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h7" color="inherit" align="left">
            {subtitle}
          </Typography>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
