import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/actions/appActions";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.listings);
  console.log("data : ", data);
  const [filteredList, setFilteredList] = useState(data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(data);
  }, [data]);

  return (
    <section className="home">
      <Filters data={filteredList} setFilteredList={setFilteredList} />

      <div className="items">
        {filteredList.map((x) => (
          <Link
            className="link"
            to={`/listing/${x._id}`}
            key={x._id}
            style={{ textDecoration: "none", display: "contents" }}
          >
            <Item item={x} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
