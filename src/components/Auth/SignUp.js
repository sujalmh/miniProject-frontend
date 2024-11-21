import React, { useState } from "react";
import axios from "../../axios";
import Alert from "../Alert";  // Assuming you have the Alert component imported

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    preference: "",
    is_lactose_intolerant: false,
    is_halal: false,
    is_vegan: false,
    is_vegetarian: false,
    is_allergic_to_gluten: false,
    is_jain: false,
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("profile_photo", profilePhoto);
    data.append("json_data", JSON.stringify(formData));

    try {
      const response = await axios.post("/api/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      {/* Success and Error Alerts */}
      {message && (
        <Alert
          type="success"
          message={message}
          onClose={() => setMessage("")}
        />
      )}
      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register User
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preference" className="block text-sm font-medium text-gray-700">
              Preference
            </label>
            <input
              type="text"
              id="preference"
              name="preference"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your preference"
              value={formData.preference}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile_photo" className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              className="mt-1 block w-full"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Lactose Intolerant", name: "is_lactose_intolerant" },
              { label: "Halal", name: "is_halal" },
              { label: "Vegan", name: "is_vegan" },
              { label: "Vegetarian", name: "is_vegetarian" },
              { label: "Allergic to Gluten", name: "is_allergic_to_gluten" },
              { label: "Jain", name: "is_jain" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={name}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                    checked={formData[name]}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
