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
  const [noData, setNoData] = useState(false);
  const [filterModal, setFilterModal] = useState(null);
  const value = "featured";

  const { filterData } = useSelector((state) => state.filter);

  const api = async () => {
    const response = await getAllProperty(filterData);
    setProperties(response);
    console.log(filterData);
    if (response.length !== 0) {
      setLoading(false);
      setNoData(false);
    } else if (filterData !== null) {
      setLoading(false);
      setNoData(true);
    }
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
    const fetchData = async () => {
      setLoading(true);
      await api();
    };

    fetchData(); // Call the fetchData function

    if (document.querySelector(".filter-select")) {
      document.querySelector(".filter-select").value = value;
    }
    // eslint-disable-next-line
  }, [filterData]);

  return (
    <>
      <NavbarLight />

      <div className="properties-section-wrapper">
        {loading ? (
          <div style={{ marginTop: "60px", display: "flex", flexWrap: "wrap" }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="loaderr" key={index}>
                <div className="wrapper">
                  <div className="circle"></div>
                  <div className="line-1"></div>
                  <div className="line-2"></div>
                  <div className="line-3"></div>
                  <div className="line-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="properties-filter-section-wrapper">
              <div className="properties-filter-section">
                <h2>
                  <ImSearch />
                  Search rental properties according to your choice
                </h2>
                <div
                  className="filter-btn"
                  onClick={() =>
                    setFilterModal({
                      cancelBtnHandler: () => setFilterModal(null),
                    })
                  }
                >
                  <button className="setting-btn">
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar1"></span>
                  </button>
                  Filters
                </div>
              </div>
            </div>

            {!noData && (
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
            )}
            {noData && (
              <div style={{ fontSize: "40px", fontWeight: "400" }}>
                Not Available
              </div>
            )}
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
