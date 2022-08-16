import React, { useState } from "react";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const Item = ({ item }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, name, city, price, moveIn, bed, bath, address, type, img } = item;
  return (
    <article className="item">
      <img className="image" src={img} alt="image" />
      <div className="details">
        <h4>${price}</h4>
        <span>/month</span>
        <div className="favorite" onClick={() => setFavorite(!favorite)}>
          {favorite ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
        </div>
        <h3>{name}</h3>
        <span>{address}</span>
        <hr />
        <div className="extra">
          <span>
            <FaBed />
            &nbsp;
            {bed} beds
          </span>
          <span>
            <FaBath />
            &nbsp;{bath} baths
          </span>
        </div>
      </div>
    </article>
  );
};

export default Item;
