import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
function Navigationbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="app_title">
          Covid-19 Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navigationbar;
