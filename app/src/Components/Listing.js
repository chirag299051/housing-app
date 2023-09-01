import React from "react";
import { Link, useParams } from "react-router-dom";

const Listing = () => {
  const { id } = useParams();

  return (
    <div className="listing">
      <div className="listing-container">
        <Link to={`/edit/${id}`} className="btn btn-primary">
          Edit listing
        </Link>
      </div>
    </div>
  );
};

export default Listing;
