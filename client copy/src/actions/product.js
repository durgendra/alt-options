import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/product";

export const createProduct = async (
  product,
  currentUser,
  dispatch,
  setPage
) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    { url, body: product, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The SUMMARY has been generated successfully",
      },
    });
    dispatch({ type: "RESET_PRODUCT" });
    setPage(1);
    dispatch({ type: "UPDATE_PRODUCT", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getProducts = async (currentUser, dispatch) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_PRODUCTS", payload: result });
  }
};
