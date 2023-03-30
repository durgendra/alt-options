import React, { useMemo, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useValue } from "../../context/ContextProvider";
import {
  Dashboard,
  Logout,
  MarkChatUnread,
  PeopleAlt,
  KingBed,
  NotificationsActive,
  Home,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import {
  useTheme,
  Theme,
  CSSObject,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useNavigate, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Users from "./users/Users";
import Rooms from "./rooms/Rooms";
import Requests from "./requests/Requests";
import Chats from "./chats/Chats";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideList = ({ open, setOpen }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [selectedLink, setSelectedLink] = useState("");

  const list = useMemo(
    () => [
      // {
      //   title: "Main",
      //   icon: <Dashboard />,
      //   link: "",
      //   component: <Main {...{ setSelectedLink, link: "" }} />,
      // },
      // {
      //   title: "Users",
      //   icon: <PeopleAlt />,
      //   link: "users",
      //   component: <Users {...{ setSelectedLink, link: "users" }} />,
      // },
      // {
      //   title: "Rooms",
      //   icon: <KingBed />,
      //   link: "rooms",
      //   component: <Rooms {...{ setSelectedLink, link: "rooms" }} />,
      // },
      // {
      //   title: "Requests",
      //   icon: <NotificationsActive />,
      //   link: "requests",
      //   component: <Requests {...{ setSelectedLink, link: "requests" }} />,
      // },
      {
        title: "New Chat",
        icon: <MarkChatUnread />,
        link: "chats",
        component: <Chats {...{ setSelectedLink, link: "chats" }} />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "UPDATE_USER", payload: null });
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        {/* <DrawerHeader>
          <Tooltip title="Go back to home page">
            <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
              <Home />
            </IconButton>
          </Tooltip>
          <Typography variant="h8" noWrap component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
        </DrawerHeader> */}
        <DrawerHeader>
          {open && (
            <Tooltip title="Product">
              <IconButton sx={{ mr: 1 }}>
                <QrCodeScannerIcon />
              </IconButton>
            </Tooltip>
          )}
          {open && (
            <Typography
              variant="h8"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Product
            </Typography>
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {open && (
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ""}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && <Typography> {currentUser?.name}</Typography>}
          {open && (
            <Typography variant="body2"> {currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default SideList;
