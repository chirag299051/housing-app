const initState = {
  listings: [],
};

const appReducer = (state = initState, action) => {
  if (action.type === "FETCH_DATA") {
    return { ...state, listings: action.data };
  }
  if (action.type === "ADD") {
    const newListings = [...state.listings, action.listing];
    return { ...state, listings: newListings };
  }
  if (action.type === "EDIT") {
    const listing = state.listings.find((x) => x?._id == action.id);
    const newListings = state.listings.filter((x) => x?._id !== action.id);

    return { ...state, listings: [...newListings, listing] };
  }
  return state;
};

export default appReducer;
