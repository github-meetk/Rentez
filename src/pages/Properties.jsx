import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllProperty } from "../services/operations/propertyAPI";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import FilterModal from "../components/FilterModal";
import { LuListFilter } from "react-icons/lu";
import { ImSearch } from "react-icons/im";


const Properties = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModal, setFilterModal] = useState(null);

  const { filterData } = useSelector((state) => state.filter);
  
  const api = async () => {
    const response = await getAllProperty(filterData);
    setProperties(response);
  };

  useEffect(() => {
    setLoading(true);
    api();
    setLoading(false);
  }, [filterData]);

  return (
    <>
      <Navbar />
      <div className="properties-filter-section-wrapper">
        <div className="properties-filter-section">
          <h2><ImSearch />Search rental properties according to your choice</h2>
          <button className="filter-btn"
            onClick={() =>
              setFilterModal({
                cancelBtnHandler: () => setFilterModal(null),
              })
            }
          >
            <LuListFilter />
            Filters
          </button>
        </div>
        
      </div>
      <div className="properties-section-wrapper">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
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
