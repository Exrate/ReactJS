import React from 'react';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon
} from '@material-ui/core'
import {
  Home,
  PersonAdd,
  SupervisorAccount,
  Router,
  Dashboard
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Link,
  Route,
  HashRouter  
} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));

function Navigation() {
  const classes = useStyles();

  return (
    <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Patient Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.toolbar} />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/queue">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Queue" />
            </ListItem>
            <ListItem button component={Link} to="/registration">              
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary={"Registration"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="/admin">
              <ListItemIcon><SupervisorAccount /></ListItemIcon>
              <ListItemText primary="Administration" />
            </ListItem>
          </List>
        </Drawer>
    </div>
  );
}

export default Navigation;
