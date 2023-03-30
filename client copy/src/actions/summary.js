import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/summary";

export const createSummary = async (
  summary,
  currentUser,
  dispatch,
  setPage
) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    { url, body: summary, token: currentUser?.token },
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
    dispatch({ type: "RESET_SUMMARY" });
    setPage(0);
    dispatch({ type: "UPDATE_SUMMARY", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getSummaries = async (currentUser, dispatch) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SUMMARIES", payload: result });
  }
};
