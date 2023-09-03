import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const fetchData = () => async (dispatch) => {
  const res = await axios.get(serverUrl);
  const data = res.data.data;
  dispatch({ type: "FETCH_DATA", data });
};

export const addListing = (listing) => async (dispatch) => {
  console.log("Listing: ", listing);
  const recivedListing = await axios.post(serverUrl + "/add", listing, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updatedData = recivedListing.data.listing;

  dispatch({ type: "ADD", updatedData });
};
export const editListing = (inputValue) => async (dispatch) => {
  const id = inputValue.id;
  console.log(inputValue);
  await axios.put(`${serverUrl}/edit/${id}`, inputValue, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  dispatch({ type: "EDIT", id });
};
