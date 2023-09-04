import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ListingModal = (props) => {
  const { _id, name, city, price, address, bed, bath, type, img } = props.item;
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
            {name}
            <h6>{address}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {price}
            <span> /month</span>
          </h4>
          <p>
            {bed} <span>bed</span>
          </p>
          <p>
            {bath} <span>bath</span>
          </p>
          <p>{type}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/edit/${_id}`} className="btn btn-primary">
            Edit listing
          </Link>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ListingModal;
