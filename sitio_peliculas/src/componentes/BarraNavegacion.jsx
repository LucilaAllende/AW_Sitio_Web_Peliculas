import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';

import Login from './Login'
import Registro from './Registro'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const [anchorL, setAnchorL] = React.useState(null);

  const handleClickL = (event) => {
    setAnchorL(event.currentTarget);
  };

  const handleCloseL = () => {
    setAnchorL(null);
  };

  const [anchorR, setAnchorR] = React.useState(null);

  const handleClickR = (event) => {
    setAnchorR(event.currentTarget);
  };

  const handleCloseR = () => {
    setAnchorR(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={()=>props.onSetSidebarOpen(true)} 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sitio Peliculas
          </Typography>
          <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClickL}
            color="inherit">Usuario</Button>
          <Button 
            aria-controls="registrar-menu" 
            aria-haspopup="true" 
            onClick={handleClickR}
            color="inherit"></Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorL}
            keepMounted
            open={Boolean(anchorL)}
            onClose={handleCloseL}
          >
              <Login/>
          </Menu>
          <Menu
            id="registrar-menu"
            anchorEl={anchorR}
            keepMounted
            open={Boolean(anchorR)}
            onClose={handleCloseR}
          >
              <Registro/>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}