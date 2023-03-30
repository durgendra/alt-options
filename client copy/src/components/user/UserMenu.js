import React from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { Settings, Logout, Dashboard } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  // const testAuthorization = async () => {
  //   const url = process.env.REACT_APP_SERVER_URL + "/room";
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     if (!data.success) {
  //       if (response.status === 401)
  //         dispatch({ type: "UPDATE_USER", payload: null });
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "UPDATE_ALERT",
  //       payload: { open: true, severity: "error", message: error.message },
  //     });
  //     console.log(error);
  //   }
  // };

  const navigate = useNavigate();
  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() => {
              dispatch({
                type: "UPDATE_PROFILE",
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              });
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}

        <MenuItem onClick={() => navigate("dashboard")}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
