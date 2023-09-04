import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ListingModal = (props) => {
  const { _id, name, city, price, address, bed, bath, type, img, postedBy } =
    props.item;
  console.log(props.item);

  return (
    <Modal
      className="right listing-modal"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-img">
        <img src={img}></img>
      </div>
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>{name}</h5>
            <span>{address}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>{city}</div>
          <div>
            <span>Posted by: </span>
            {postedBy}
          </div>
          <div>
            ${price}
            <span>/mo</span>
          </div>
          <div>
            <span>Type: </span>
            {type}
          </div>

          <div>
            {bed}
            <span> Beds</span>
          </div>
          <div>
            {bath}
            <span> Baths</span>
          </div>
        </Modal.Body>
        <div className="modal-buttons">
          <Link to={`/edit/${_id}`} className="btn btn-dark">
            Edit listing
          </Link>
          <Button className="btn btn-red" onClick={props.onHide}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ListingModal;
