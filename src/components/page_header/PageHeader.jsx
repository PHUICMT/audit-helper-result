import * as React from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutOption } from "../../components/dialog_popup/ErrorDialogPopup";

function PageHeader(props) {
  const { title, subtitle } = props;

  return (
    <React.Fragment>
      <div className="header_toolsbar">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 5,
          }}
        >
          <Typography
            variant="h5"
            color="inherit"
            align="left"
            paddingBottom={2}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h7" color="inherit" align="left">
              {subtitle}
            </Typography>
          )}
        </Toolbar>

        <Button
          sx={{
            height: 40,
            width: 100,
          }}
          color="error"
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={() => LogoutOption()}
        >
          Logout
        </Button>
      </div>
    </React.Fragment>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
