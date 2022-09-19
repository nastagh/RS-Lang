import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function GameMenu({ page, groups, disabled }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const linkByGameAudioCall = () => {
    navigate('/audio-call', { state: { page, groups } });
  };
  const linkByGameSprint = () => {
    navigate('/sprint', { state: { page, groups } });
  };

  return (
    <>
      <Button
        disabled={disabled}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Игры
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleClose(); linkByGameAudioCall();
        }}
        >
          Аудиовызов

        </MenuItem>
        <MenuItem onClick={() => {
          handleClose(); linkByGameSprint();
        }}
        >
          Спринт

        </MenuItem>

      </Menu>
    </>
  );
}
