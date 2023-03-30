import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import PasswordField from "./PasswordField";
import { Send, Close } from "@mui/icons-material";
import { updateProfile } from "../../actions/user";
const Profile = () => {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();
  const nameRef = useRef();
  const handleClose = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoURL },
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    updateProfile(currentUser, { name, file: profile.file }, dispatch);

    // dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, open: false } });
  };
  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="name"
            label="Name"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={currentUser?.name}
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
