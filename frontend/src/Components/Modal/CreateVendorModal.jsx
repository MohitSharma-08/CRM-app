import { useState } from "react";
import { createVendor } from "../../api/ApiList";
import toast from "react-hot-toast";

export default function CreateVendorModal({ handleModal, users, setUsers }) {
  const [form, setForm] = useState({
    name: "",
    agency: "",
    location: "",
    address: "",
    gst: "",
    pan: "",
    contact: "",
    email: "",
    password: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => Object.values(form).every((v) => v.trim() !== "");
  const isEmailValid = () => /\S+@\S+\.\S+/.test(form.email);
  const isPhoneValid = () => /^[0-9]{10}$/.test(form.contact);

  const isCityTaken = (city) => {
    return users.some((u) => u.location.toLowerCase() === city.toLowerCase());
  };

  const handleCreateVendor = async () => {
    if (!isFormValid()) return alert("Please fill all fields");
    if (!isEmailValid()) return alert("Invalid email");
    if (!isPhoneValid()) return alert("Contact must be 10 digits");
    if (isCityTaken(form.location))
      return alert("A user from this city already exists.");

    try {
      const newVendor = await createVendor(form);

      // Update UI instantly
      setUsers((prev) => [...prev, newVendor]);

      // Close modal
      handleModal();

      // Reset form
      setForm({
        name: "",
        agency: "",
        location: "",
        address: "",
        gst: "",
        pan: "",
        contact: "",
        email: "",
        password: "",
      });

      toast.success("Vendor created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error while creating vendor");
    }
  };

  const fieldLabels = {
    name: "Full Name",
    agency: "Agency Name",
    location: "City",
    address: "Address",
    gst: "GST Number",
    pan: "PAN Number",
    contact: "Contact Number",
    email: "Email Address",
    password: "Password",
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50"
      onClick={handleModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <h2 className="text-2xl font-light text-gray-900 mb-1">
            Create New Vendor
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Fill in the details below
          </p>

          <div className="space-y-2">
            {Object.keys(form).map((key) => (
              <div key={key} className="relative">
                <input
                  type={
                    key === "password"
                      ? "password"
                      : key === "email"
                      ? "email"
                      : "text"
                  }
                  name={key}
                  value={form[key]}
                  onChange={updateForm}
                  onFocus={() => setFocusedField(key)}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  className="peer w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-gray-400 focus:bg-white placeholder-transparent"
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none
                    ${
                      form[key] || focusedField === key
                        ? "-top-2 text-xs bg-white px-1 text-gray-600"
                        : "top-2.5 text-sm text-gray-500"
                    }
                  `}
                >
                  {fieldLabels[key]}
                </label>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleCreateVendor}
              type="button"
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Create vendor
            </button>

            <button
              onClick={handleModal}
              type="button"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
