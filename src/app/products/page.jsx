import Link from 'next/link';
import React from 'react';

async function Products() {
  async function getAllProducts() {
    await new Promise(resolve => setTimeout(resolve, 4000));

    let products = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      next: {
        revalidate: 3,
      },
    });
    products = await products.json();
    return products;
  }

  let { data } = await getAllProducts();

  return (
    <>
    <div className="container w-3/4 mx-auto">

      <h1 className="text-2xl font-bold mb-5">Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map((product) => {
          return (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link href={'products/' + product._id}>
                <img src={product.imageCover} className="w-full h-48 object-cover" alt="Product image" />
                <h3 className="h5 p-2 text-center font-semibold">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Products;
