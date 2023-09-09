import React, { useState } from "react";
import Filter from "./Filter";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { cities, moveIn, type, price } from "../data";

const Filters = ({ data, setFilteredList }) => {
  const [filter_by_cities, setFilter_by_cities] = useState([]);
  const [filter_by_price, setFilter_by_price] = useState([]);
  const [filter_by_type, setFilter_by_type] = useState([]);

  const cityFilter = (data) => {
    return filter_by_cities.length === 0
      ? data
      : data.filter((x) => filter_by_cities.includes(x.city));
  };
  const priceFilter = (data) => {
    return filter_by_price.length === 0
      ? data
      : filter_by_price.length === 1
      ? data.filter(
          (x) =>
            x.price >= filter_by_price[0][0] && x.price <= filter_by_price[0][1]
        )
      : data.filter((x) => {
          for (let y of filter_by_price) {
            if (x.price >= y[0] && x.price <= y[1]) return true;
          }
          return false;
        });
  };
  const typeFilter = (data) => {
    return filter_by_type.length === 0
      ? data
      : data.filter((x) => filter_by_type.includes(x.type));
  };

  const handleSearch = () => {
    const citiesFiltered = cityFilter(data);
    const priceFiltered = priceFilter(citiesFiltered);
    const typeFiltered = typeFilter(priceFiltered);

    setFilteredList(typeFiltered);
  };

  return (
    <section className="filters">
      <Filter
        cityFilter={setFilter_by_cities}
        options={cities}
        type={"Location"}
      />
      <Filter priceFilter={setFilter_by_price} options={price} type={"Price"} />
      <Filter
        typeFilter={setFilter_by_type}
        options={type}
        type={"Property Type"}
      />
      <Button variant="info" className="btn-search" onClick={handleSearch}>
        Search
      </Button>
      <Link to={"/add"} className="btn-add btn btn-primary">
        Add Listing
      </Link>
    </section>
  );
};

export default Filters;
