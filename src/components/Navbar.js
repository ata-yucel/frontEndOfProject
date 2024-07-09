import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../store/slices/userSlice';

const pages = ['Category', 'About', 'Orders'];

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartNumber } = useSelector(state => state.cart);
  const { user, username } = useSelector(state => state.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCategory, setAnchorElCategory] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  const handleNavigate = (page) => {
    navigate(`/${page.toLowerCase()}`);
    handleCloseNavMenu();
  }

  const setLogout = () => {
    dispatch(handleLogout());
    handleCloseUserMenu();
    navigate('/login'); // Logout işlemi sonrası login sayfasına yönlendir
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgba(250,235,215, 0.8)", marginBottom: "15px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',  
                fontWeight: 600,
                color: 'black',
                textDecoration: 'none',
              }}
            >
              BAZISIBURADA
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={page === 'Category' ? handleOpenCategoryMenu : () => handleNavigate(page)}>
                  <Typography color={"darkblue"} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            BAZISIBURADA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page === 'Category' ? handleOpenCategoryMenu : () => handleNavigate(page)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ mr: 2, border: "1px solid gray" }} onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartNumber} color='error'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            {
              user ?
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={username.toUpperCase()} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                :
                <Link to="/login" className=' bg-green-400 p-2 hover:bg-green-600 rounded-md'>Login</Link>
            }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => { navigate("/profile"); handleCloseUserMenu(); }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={setLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>

            {/* Category Menu */}
            <Menu
              sx={{ mt: '45px' }}
              id="category-menu"
              anchorEl={anchorElCategory}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCategory)}
              onClose={handleCloseCategoryMenu}
            >
              <MenuItem onClick={() => { navigate("/manhome"); handleCloseCategoryMenu(); }}>
                <Typography textAlign="center">Man</Typography>
              </MenuItem>
              <MenuItem onClick={() => { navigate("/womanhome"); handleCloseCategoryMenu(); }}>
                <Typography textAlign="center">Woman</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Navbar;
