import React, { useEffect, useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

const Filter = ({
  options,
  type,
  cityFilter,
  moveInFilter,
  priceFilter,
  typeFilter,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getValues = selected.map((x) => x.value);

    if (type === "Location") {
      cityFilter(getValues);
    }
    if (type === "When") {
      moveInFilter(getValues);
    }
    if (type === "Price") {
      priceFilter(getValues);
      console.log(getValues);
    }
    if (type === "Property Type") {
      typeFilter(getValues);
    }
  }, [selected]);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const handleChange = (option) => {
    setSelected(option);
  };

  return (
    <span
      className="d-inline-block filter"
      data-toggle="popover"
      data-trigger="focus"
      data-content="Please selecet account(s)"
    >
      <ReactSelect
        options={options}
        placeholder={type}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={selected}
        styles={{ borderRadius: "50%" }}
      />
    </span>
  );
};

export default Filter;
