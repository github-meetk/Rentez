import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAllProperty } from '../services/operations/propertyAPI';
import Card from '../components/Card';

const Properties = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState((true));

  const api = async () => {
    const response = await getAllProperty();
    setProperties(response);
  };

  useEffect(() => {
    setLoading(true)
    api();
    setLoading(false)
  },[])

  return (
    <>
      <Navbar/>
      <div className='properties-section-wrapper'>
      {
        loading ? (
          <span className='loader'></span>
        ) : (
          <>
          {
            properties.map((property, index) => {
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
              )
            })
          }
          </>
        )
      }
      </div>
      <Footer/>
    </>
  )
}

export default Properties
