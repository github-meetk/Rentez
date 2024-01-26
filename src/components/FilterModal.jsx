import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setFilterData } from "../slices/filterSlice";

export default function FilterModal({ modalData }) {

    const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    propertyType: [],
    bhk: "",
    bathrooms: "",
    city: "",
    state: "",
    priceMin: "",
    priceMax: "",
  });

  const Checkbox = ({ label, checked, onChange }) => (
    <label className="filter-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <p>{label}</p>
    </label>
  );

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [field]: value };
    });
  };

  const clearFilterHandler = () => {
    dispatch(setFilterData(null));
    modalData.cancelBtnHandler();
  }

  const handlePropertyTypeChange = (value) => {
    setFilters((prevFilters) => {
      const updatedPropertyTypes = prevFilters.propertyType.includes(value)
        ? prevFilters.propertyType.filter((type) => type !== value)
        : [...prevFilters.propertyType, value];
      return { ...prevFilters, propertyType: updatedPropertyTypes };
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if( parseInt(filters.priceMin) > parseInt(filters.priceMax)){
        toast.error("Min price should not greater than Max price")
    }
    else{
    dispatch(setFilterData(filters));
    modalData.cancelBtnHandler();
    }
  }

  return (
    <div className="filter-wrapper" onClick={modalData.cancelBtnHandler}>
      <div className="filter" >
      <h2>Filters<hr/></h2>
      
      <form className="filter-form" onSubmit={handleOnSubmit}>
        <div className="filter-form-top">
          Property Type
          <Checkbox
            label="Flat"
            checked={filters.propertyType?.includes("Flat")}
            onChange={() => handlePropertyTypeChange("Flat")}
          />
          <Checkbox
            label="Bunglow"
            checked={filters.propertyType?.includes("Bunglow")}
            onChange={() => handlePropertyTypeChange("Bunglow")}
          />
          <Checkbox
            label="Farmhouse"
            checked={filters.propertyType?.includes("Farmhouse")}
            onChange={() => handlePropertyTypeChange("Farmhouse")}
          />
          <Checkbox
            label="Villa"
            checked={filters.propertyType?.includes("Villa")}
            onChange={() => handlePropertyTypeChange("Villa")}
          />
          <Checkbox
            label="Land"
            checked={filters.propertyType?.includes("Land")}
            onChange={() => handlePropertyTypeChange("Land")}
          />
        </div>
        <hr />
        <div className="filter-form-bottom">
        <label>
          Price
          <div className="filter-price">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
            />
          </div>
        </label>
        <hr />
        <label>
          Bedrooms
          <input
            type="number"
            placeholder="no. of rooms"
            value={filters.bhk}
            onChange={(e) => handleFilterChange("bhk", e.target.value)}
          />
        </label>
        <hr />
        <label>
          Bathrooms
          <input
            type="number"
            placeholder="no. of bathrooms"
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
          />
        </label>
        <hr />
        <label>
          City
          <input
            type="text"
            placeholder="city"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          />
        </label>
        <hr />
        <label>
          State
          <input
            type="text"
            placeholder="state"
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          />
        </label>
        <hr />
        <div className="filter-button">
            <button className="clear-filter-btn" type="button" onClick={clearFilterHandler}>Clear filters</button>
            <button className="search-filter-btn" type="submit">Search</button>
        </div>
        </div>
      </form>
      
      </div>
      
    </div>
  );
}
