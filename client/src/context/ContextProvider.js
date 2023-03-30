import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  images: [],
  papers: [],
  details: { title: "", description: "", price: 0 },
  detailsP: { title: "Papers Summary" },
  location: { lng: 0, lat: 0 },
  rooms: [],
  summaries: [],
  priceFilter: 50,
  addressFilter: null,
  filteredRooms: [],
  filteredSummaries: [],
  room: null,
  summary: null,
  users: [],
  detailsProducts: { name: "", category: "", criteria: "" },
  filteredProducts: [],
  products: [],
  product: null,
};
const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
