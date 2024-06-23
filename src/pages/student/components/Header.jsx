import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../auth/AuthProvider";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import HomeIcon from '@mui/icons-material/Home'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
  }),
);

const Header = ({ title, list }) => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Access the logOut, and loading state from the AuthContext
  const { logOut } = useContext(AuthContext);

  // Handle user logout
  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => console.error(error));
  };

  // Handle notification button click
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'notification-popover' : undefined;

  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // Render loading indicator if authentication state is still loading
  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            backgroundColor: '#FC8149',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <List sx={{ p: 0, marginY: '8px', display: 'flex', justifyContent: 'space-between'}}>
          <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit', alignSelf: 'center' }}>
            <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                  My Courses
                </ListItemText>
            </ListItemButton>
          </Link>  
          <IconButton onClick={toggleDrawer} sx={{ alignSelf: 'center' }}>
            <ChevronLeftIcon />
          </IconButton>
        </List>
        <Divider />
        <List component="nav" sx={{ flexGrow: 1 }}>
          {list}
        </List>
      </Drawer>
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>You have no new notifications</Typography>
        </Box>
      </Popover>
      <Menu
        id="profile-menu"
        anchorEl={profileMenuAnchorEl}
        keepMounted
        open={Boolean(profileMenuAnchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem component={Link} to="/profile">Profile</MenuItem>
        <MenuItem component={Link} to="/courses">Back to My Courses</MenuItem>
        <MenuItem component={Link} to="/booking">Book an Advisor</MenuItem>
        <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
}

export default Header;

