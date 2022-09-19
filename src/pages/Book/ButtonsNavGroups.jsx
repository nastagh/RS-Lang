import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styled from '@emotion/styled';
// import { makeStyles, styled } from '@mui/styles';
// import { Box, Container } from '@mui/system';

const ToggleButton = styled(MuiToggleButton)(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#ac3b61',
    backgroundColor: 'white',
  },
}));

function ButtonsNavGroups({
  user, setGroups, setPage, groups,
}) {
  const handleAlignment = (
    event,
    newAlignment,
  ) => {
    setGroups(newAlignment);
    setPage(1);
  };

  return (
    <ToggleButtonGroup
      value={groups}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton sx={{ backgroundColor: ' #f9d2df' }} value={1} aria-label="left aligned">
        Группа 1
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: '#f7c2d4' }} value={2} aria-label="centered">
        Группа 2
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: ' #f3aec5 ' }} value={3} aria-label="right aligned">
        Группа 3
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: '#f19ab8 ' }} value={4} aria-label="justified">
        Группа 4
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: ' #d77294 ' }} value={5} aria-label="justified">
        Группа 5
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: ' #c9597f ' }} value={6} aria-label="justified">
        Группа 6
      </ToggleButton>
      <ToggleButton sx={{ backgroundColor: ' #ac3b61' }} value={7} disabled={!user} aria-label="justified">
        Сложные слова
      </ToggleButton>
    </ToggleButtonGroup>

  );
}

export default ButtonsNavGroups;
