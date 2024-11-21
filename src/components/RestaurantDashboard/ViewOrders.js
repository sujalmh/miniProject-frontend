import React, { useState } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      items: [
        { name: "Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 2 },
      ],
      total: 25.97,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: [
        { name: "Pasta Carbonara", quantity: 1 },
        { name: "Tiramisu", quantity: 1 },
      ],
      total: 19.98,
      status: "Completed",
    },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for Order ID: ${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-white mb-6">View Orders</h1>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800 outline outline-2 outline-gray-700 p-6 rounded-lg shadow-lg "
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Order ID: {order.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Details */}
            <div className="mb-4">
              <p className="text-white">
                <strong>Customer:</strong> {order.customer}
              </p>
              <ul className="mt-2 text-white">
                <strong>Items:</strong>
                {order.items.map((item, index) => (
                  <li key={index} className="ml-4">
                    - {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-white">
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              {order.status === "Pending" && (
                <button
                  onClick={() => handleStatusUpdate(order.id, "Completed")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => handleViewDetails(order.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
