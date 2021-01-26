import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Face from '@material-ui/icons/Face';

import firebase from 'firebase/app';

import ColorPicker from '../common/ColorPicker';
import { updatePlayer } from '../api/player';

interface UserDialogProps {
  user: firebase.User | null;
}

export default function UserDialog({ user }: UserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('#2196f3');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) return null;

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
        <Face />
      </IconButton>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'User settings'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can change some user settings</DialogContentText>
          <DialogContentText>Your color: {color}</DialogContentText>
          <ColorPicker
            color={color}
            onChange={value => {
              setColor(value);
              updatePlayer({ id: user.uid, color: value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
