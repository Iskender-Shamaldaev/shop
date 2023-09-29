import React from 'react';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as Navlink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import AnonymousMenu from './AnonumousMenu';
import UserMenu from './UserMenu';

const Link = styled(Navlink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">CompStore</Link>
        </Typography>

        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
