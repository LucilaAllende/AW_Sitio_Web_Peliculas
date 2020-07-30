import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './Login'
import { useUser } from 'reactfire';

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
  const user = useUser();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          {
            user &&
            <IconButton
              onClick={() => props.onSetSidebarOpen(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <Button
                aria-haspopup="true"
                onClick={() => props.onSetSidebarOpen(true)}
                color="inherit">Mi lista</Button> <MenuIcon />
            </IconButton>}

          <Typography variant="h6" className={classes.title} align="center">
            Sitio Peliculas
          </Typography>

          <Login handleEstadoUsuario={props.handleEstadoUsuario} />
          {user &&
            < img src={user.photoURL} alt="Perfil" className='user-profile' align="right" />
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}