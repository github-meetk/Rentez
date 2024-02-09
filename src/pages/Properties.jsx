import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { getAllProperty } from "../services/operations/propertyAPI";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import FilterModal from "../components/FilterModal";
import { ImSearch } from "react-icons/im";
import NavbarLight from "../components/NavbarLight";

const Properties = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModal, setFilterModal] = useState(null);
  const value = "featured";

  const { filterData } = useSelector((state) => state.filter);

  const api = async () => {
    const response = await getAllProperty(filterData);
    setProperties(response);
  };

  const filterHandler = (value) => {
    let data = [...properties];
    console.log(data);
    if (data.length > 0) {
      if (value === "lth") {
        const result = data.sort((a, b) => a.price - b.price);
        setProperties(result);
      } else if (value === "htl") {
        const result = data.sort((a, b) => b.price - a.price);
        setProperties(result);
      } else {
        setProperties(data);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    api();
    if (document.querySelector(".filter-select")) {
      document.querySelector(".filter-select").value = value;
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [filterData]);

  return (
    <>
      <NavbarLight />

      <div className="properties-section-wrapper">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            <div className="properties-filter-section-wrapper">
              <div className="properties-filter-section">
                <h2>
                  <ImSearch />
                  Search rental properties according to your choice
                </h2>
                <button
                  className="filter-btn"
                  onClick={() =>
                    setFilterModal({
                      cancelBtnHandler: () => setFilterModal(null),
                    })
                  }
                >
                  <button class="setting-btn">
                    <span class="bar bar1"></span>
                    <span class="bar bar2"></span>
                    <span class="bar bar1"></span>
                  </button>
                  Filters
                </button>
              </div>
            </div>

            <div className="properties-sort-section">
              <h2>Explore all property</h2>
              <div>
                <select
                  className="filter-select"
                  defaultValue={value}
                  onChange={(e) => filterHandler(e.target.value)}
                >
                  <option value="featured">Sort by : Featured</option>
                  <option value="lth">Price : Low to High</option>
                  <option value="htl">Price : High to Low</option>
                </select>
              </div>
            </div>
            {properties.map((property, index) => {
              return (
                <Card
                  key={index}
                  propertyId={property._id}
                  img={property.thumbnail}
                  bhk={property.bhk}
                  bath={property.bathrooms}
                  size={property.size}
                  price={property.price}
                  pricePer={property.pricePer}
                  city={property.city}
                  state={property.state}
                  type={property.propertyType}
                />
              );
            })}
          </>
        )}
      </div>
      <Footer />
      {filterModal && <FilterModal modalData={filterModal} />}
    </>
  );
};

export default Properties;
