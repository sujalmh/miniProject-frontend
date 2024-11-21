import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Pizza', price: 10, quantity: 1, img: '/images/pizza.jpg' },
    { id: 2, name: 'Pasta', price: 8, quantity: 2, img: '/images/pasta.jpg' },
    { id: 3, name: 'Tiramisu', price: 12, quantity: 1, img: '/images/tiramisu.jpg' },
  ]);

  const handleIncrease = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity > 1) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left: Cart Items */}
      <div className="flex-1 bg-gray-800 bg-opacity-45 outline outline-2 outline-gray-700 rounded-lg shadow-xl shadow-gray-900 p-6 ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-white mb-4">Cart Items</h2>
          <p className="text-md text-gray-100">Price</p>
        </div>
                
        {cart.length > 0 ? (
          cart.map(item => (
            <div
              key={item.id}
              className="flex  justify-between border-b border-gray-400 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              {/* Item Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-28 h-28 rounded-lg object-cover mr-4"
              />
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl text-gray-100">{item.name}</h3>
                  <p className="text-lg text-gray-100">${item.price.toFixed(2)}</p>
                </div>
                {/* Quantity Box */}
                <div className="flex items-center mt-4 bottom-0">
                  <div className="flex items-center justify-between border-2 border-yellow-200 rounded-lg bg-gray-800 text-white w-[5.5rem] px-2 py-0.5">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="text-gray-200 hover:text-red-500"
                    >
                      {item.quantity > 1 ? (
                        <span><FaMinus className='text-sm'/></span> // Minus Icon
                      ) : (
                        <span><FaTrash className='text-sm'/></span> // Trash Icon
                      )}
                    </button>
                    <span className="text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="text-gray-200 hover:text-blue-500"
                    >
                      <span><FaPlus className='text-sm'/></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        <Link to={'/'}>
          <button
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Add More Items
          </button>
        </Link>
      </div>

      {/* Right: Total */}
      <div className="w-full h-48 lg:w-1/3 bg-gray-800 bg-opacity-45 outline outline-2 outline-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl text-white mb-4">Order Summary</h2>
        <p className="text-gray-100">
          Total: <span className="font-bold text-lg text-white">${total.toFixed(2)}</span>
        </p>
        <Link to={'/payment'}>
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
