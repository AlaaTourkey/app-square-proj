'use client';
import React from 'react';

async function ProductDetails({ params }) {
  let productId = params.productId;

  let productDetails = await fetch(`https://ecommerce.routemisr.com/api/v1/products/` + productId);
  productDetails = await productDetails.json();
  console.log(productDetails.data);

  return (
    <>
      <div className="container w-3/4 mt-20 mx-auto my-5 px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img className='w-full h-auto object-cover rounded-lg' src={productDetails.data.imageCover} alt={productDetails.data.title} />
          </div>
          <div className="md:w-2/3 flex mx-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{productDetails.data.title}</h3>
              <p className="text-gray-700 mb-4">{productDetails.data.description}</p>
              <span className="text-xl font-semibold">{productDetails.data.price} EGP</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
