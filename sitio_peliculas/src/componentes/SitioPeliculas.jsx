import Buscador from './Buscador';
import Lista from './Lista';
import Resultado from './Resultado'

import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
      align: 'flex-end',
      marginLeft: 1050,
      marginRight: -12,
  },
  sectionDesktop: {
    display: 'none',
    alignItems: 'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

class SitioPeliculas extends Component {

    constructor(){
        super();
        this.state={
          termino:'',
          imagenes: [],
          pagina: '',
          open: false,
        }
    
      }

    classes = () => {
        useStyles();
    }

    theme = () => {
        useTheme();
    }

    setOpen = (bandera) => {
        this.setState({open: bandera});
    }

    handleDrawerOpen = () => {
        this.setOpen(true);
    };

    handleDrawerClose = () => {
        this.setOpen(false);
    };

    render(){
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(this.classes.appBar, {
                    [this.classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                        className={clsx(this.classes.menuButton, this.state.open && this.classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                    <div className={this.classes.sectionDesktop}>
                        <Button color="inherit" className={this.classes.loginButton}>Login</Button>
                    </div>         
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={this.classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                    paper: this.classes.drawerPaper,
                    }}
                >
                    <div className={this.classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {this.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                <main
                    className={clsx(this.classes.content, {
                    [this.classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={this.classes.drawerHeader} />
                    <Buscador/>
                        HOLAAAAA
                </main>
            </div>
        );
    }  
}

export default SitioPeliculas;