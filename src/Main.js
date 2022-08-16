import React, { useState } from "react";
import { data } from "./data";
import Filters from "./Filters";
import Item from "./Item";

const Main = () => {
  const [properties, setProperties] = useState(data);
  const [filteredList, setFilteredList] = useState(properties);
  console.log("List : ", filteredList);

  return (
    <section className="main">
      <Filters data={properties} setFilteredList={setFilteredList} />
      <div className="items">
        {filteredList.map((x) => (
          <Item key={x.id} item={x} />
        ))}
      </div>
    </section>
  );
};

export default Main;
