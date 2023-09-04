import React, { useEffect, useState } from "react";
import { Button, ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { addListing, editListing } from "../store/actions/appActions";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../assets/house2.jpeg";

const AddEdit = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState({
    type: "",
    name: "",
    city: "",
    price: 0,
    address: "",
    bed: 0,
    bath: 0,
    file: image,
    postedBy: "",
  });
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.app.listings);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const listing = listings.filter((x) => x._id === id)[0];
      console.log("listing :", listing);
      setInputValue(listing);
    }
  }, [id, listings]);

  console.log(inputValue);

  const handleChange = (e, name) => {
    if (name === "file" && e.target.files.length !== 0) {
      setInputValue({
        ...inputValue,
        file: e.target.files[0],
        // [name]: URL.createObjectURL(e.target.files[0]),
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
    const formData = new FormData();
    if (!inputValue.file) {
      formData.append("file", image);
    }

    formData.append("type", inputValue.type);
    formData.append("name", inputValue.name);
    formData.append("city", inputValue.city);
    formData.append("price", inputValue.price);
    formData.append("address", inputValue.address);
    formData.append("bed", inputValue.bed);
    formData.append("bath", inputValue.bath);
    formData.append("file", inputValue.file);
    formData.append("postedBy", inputValue.postedBy);
    id && formData.append("id", id);

    // Create an object to store the data.
    const formDataObject = {};

    // Iterate through the FormData entries and populate the object.
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    if (id) {
      dispatch(editListing(formDataObject));
    } else {
      dispatch(addListing(formDataObject));
    }

    setInputValue({
      type: "",
      name: "",
      price: 0,
      city: "",
      address: "",
      bed: 0,
      bath: 0,
      file: "",
      postedBy: "",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const cities = ["New York", "Toronto", "Vancouver"];
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
                  name="city"
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
                  key={val * 2}
                  id={val * 2}
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
                  key={val * 10}
                  id={val * 10}
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
                name="postedBy"
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
                onChange={(e) => handleChange(e, "file")}
              />
              <img src={inputValue?.file} />
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
