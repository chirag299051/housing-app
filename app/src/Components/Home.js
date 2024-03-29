import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/actions/appActions";
import ListingModal from "./ListingModal";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.listings);
  const [filteredList, setFilteredList] = useState(data);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(data);
  }, [data]);

  useEffect(() => {
    filteredList?.length !== 0 && setLoading(false);
  }, [filteredList]);

  console.log("filtered: ", filteredList);

  const handleClick = (x) => {
    setSelected(x);
    setModal(true);
  };

  return (
    <section className="home">
      <Filters data={filteredList} setFilteredList={setFilteredList} />
      <div className="items">
        {!loading ? (
          filteredList?.map((x) => {
            return x?._id ? (
              <Item item={x} key={x._id} onClick={() => handleClick(x)} />
            ) : null;
          })
        ) : (
          <Loading />
        )}
      </div>
      <ListingModal
        show={modal ? true : false}
        onHide={() => setModal(false)}
        item={selected}
      />
    </section>
  );
};

export default Home;
