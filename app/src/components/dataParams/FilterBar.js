import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  ClickAwayListener,
  Drawer,
  Divider,
} from "@material-ui/core";
import clsx from "clsx";

// components
import { BatchSelect } from "./BatchSelect";
import { Dashboard } from "./Dashboard";

// styles
import { makeStyles } from "@material-ui/core/styles";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#000018",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: theme.palette.background.default,
  }
}));

const FilterBar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickAway = (e) => {
    if (e.x > drawerWidth && e.y > 70 && open) {
      setOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <BatchSelect />
        </Toolbar>
      </AppBar>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton color="inherit" edge="end" onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Dashboard />
        </Drawer>
      </ClickAwayListener>
    </div>
  );
};

export { FilterBar };