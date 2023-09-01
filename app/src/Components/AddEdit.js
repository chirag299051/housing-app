import React, { useEffect, useState } from "react";
import { Button, ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { addListing, editListing } from "../store/actions/appActions";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddEdit = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState({
    type: "",
    name: "",
    price: 0,
    address: "",
    bed: 0,
    bath: 0,
  });
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.app.listings);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const listing = listings.filter((x) => x._id == id)[0];
      console.log("listing :", listing);
      setInputValue(listing);
    }
  }, [id, listings]);

  const handleChange = (e, name) => {
    if (name === "img" && e.target.files.length !== 0) {
      setInputValue({
        ...inputValue,
        file: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setInputValue({
        ...inputValue,
        [name]: typeof e == "object" ? e.target.value : e,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    id && dispatch(editListing(inputValue));
    id || dispatch(addListing(inputValue));
    setInputValue({
      type: "",
      name: "",
      price: 0,
      address: "",
      bed: 0,
      bath: 0,
    });
    navigate("/");
  };

  const cities = ["New York", "Toronto", "Vancouver", "New Delhi"];
  const type = ["House", "Apartment"];

  return (
    <div className="add-edit">
      <h1>{id ? "Edit Your Listing" : "Rent Your Property"}</h1>

      <Form className="container" encType="multipart/form-data">
        <div className="container-2">
          <div className="row">
            <p>Type</p>
            <ToggleButtonGroup
              type="radio"
              name="type"
              value={inputValue?.type}
              onChange={(e) => handleChange(e, "type")}
            >
              {type.map((val) => (
                <ToggleButton
                  variant="dark"
                  name="type"
                  key={val}
                  id={val}
                  className="btn-toggle"
                  value={val}
                >
                  {val}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>

          <div className="row">
            <Form.Group className="mb-3 row-2" controlId="formBasicEmail">
              <Form.Label>Street</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e, "name")}
                type="text"
                value={inputValue?.name}
              />
            </Form.Group>
            <div className="pad"></div>
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3 row-2">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                className="form-control"
                onChange={(e) => handleChange(e, "price")}
                type="text"
                value={inputValue?.price}
              />
              <InputGroup.Text>/month</InputGroup.Text>
            </InputGroup>
          </div>

          <div className="row">
            <p>City</p>
            <ToggleButtonGroup
              type="radio"
              name="city"
              value={inputValue?.city}
              onChange={(e) => handleChange(e, "city")}
            >
              {cities.map((val) => (
                <ToggleButton
                  variant="dark"
                  name="bed"
                  key={val}
                  id={val}
                  className="btn-toggle"
                  value={val}
                >
                  {val}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>

          <div className="row">
            <p>Rooms</p>
            <ToggleButtonGroup
              type="radio"
              name="bed"
              value={Number(inputValue?.bed)}
              onChange={(e) => handleChange(e, "bed")}
            >
              {[1, 2, 3].map((val) => (
                <ToggleButton
                  variant="dark"
                  name="bed"
                  key={val}
                  id={val}
                  className="btn-toggle"
                  value={val}
                >
                  {val} Bhk
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="row">
            <p>Bathrooms</p>
            <ToggleButtonGroup
              type="radio"
              name="bath"
              value={inputValue?.bath}
              onChange={(e) => handleChange(e, "bath")}
            >
              {[1, 2, 3].map((val) => (
                <ToggleButton
                  variant="dark"
                  name="bath"
                  key={val}
                  id={val}
                  className="btn-toggle"
                  value={val}
                >
                  {val}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="container-2">
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e, "address")}
                type="text"
                value={inputValue?.address}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3 row-2" controlId="formBasicEmail">
              <Form.Label>Posted by</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e, "postedBy")}
                type="text"
                value={inputValue?.postedBy}
              />
            </Form.Group>
            <div className="pad"></div>
            <Form.Group controlId="formFile" className="mb-3 row-2 img">
              <Form.Label>Add Image</Form.Label>
              <Form.Control
                name="file"
                type="file"
                onChange={(e) => handleChange(e, "img")}
              />
              <img src={inputValue?.img} />
            </Form.Group>
          </div>
        </div>
        <Button
          className="btn-submit btn-dark"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddEdit;
