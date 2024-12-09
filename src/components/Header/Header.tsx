import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, IconButton, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useContext(ThemeContext);

  const tabs = [
    { label: 'Flights', path: '/' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Car Rentals', path: '/car-rentals' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Travel Search
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{ ml: 2 }}
        >
          {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
