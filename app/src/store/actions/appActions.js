import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const fetchData = () => async (dispatch) => {
  const res = await axios.get(serverUrl);
  const data = res.data.data;
  dispatch({ type: "FETCH_DATA", data });
};

export const addListing = (listing) => async (dispatch) => {
  console.log("Listing: ", listing);
  await axios.post(serverUrl + "/add/", listing);
  dispatch({ type: "ADD", listing });
};
export const editListing = (inputValue) => async (dispatch) => {
  const id = inputValue._id;
  await axios.put(`${serverUrl}/edit/${id}`, inputValue);
  dispatch({ type: "EDIT", id });
};
