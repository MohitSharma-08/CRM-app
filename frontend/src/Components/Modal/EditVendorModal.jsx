import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { editVendor } from "../../api/apiList";

export default function EditVendorModal({ handleModal, selectedUser, setUsers }) {
  const [form, setForm] = useState({
    name: "",
    agency: "",
    location: "",
    address: "",
    gst: "",
    pan: "",
    contact: "",
    email: "",
    password: "", // optional, only send if user wants to update
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        agency: selectedUser.agency || "",
        location: selectedUser.location || "",
        address: selectedUser.address || "",
        gst: selectedUser.gst || "",
        pan: selectedUser.pan || "",
        contact: selectedUser.contact || "",
        email: selectedUser.email || "",
        // password: "", // never prefill password
      });
    }
  }, [selectedUser]);

  // Handle input changes
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit the edit request
  const handleEditVendor = async () => {
    try {
      const changedData = {};
      for (const key in form) {
        if (form[key] !== selectedUser[key] && form[key] !== "") {
          changedData[key] = form[key];
        }
      }

      const updatedVendor = await editVendor(selectedUser.vendor_uid, changedData);

      // Update state
      setUsers((prev) =>
        prev.map((v) =>
          v.vendor_uid === selectedUser.vendor_uid ? updatedVendor : v
        )
      );

      toast.success("Vendor updated!");
      handleModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update vendor");
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
            Edit Vendor Details
          </h2>

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
                  placeholder=" "
                  className="peer w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg"
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none
                    ${
                      form[key]
                        ? "-top-2 text-xs bg-white px-1 text-gray-600"
                        : "top-2.5 text-sm text-gray-500"
                    }`}
                >
                  {fieldLabels[key]}
                </label>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleEditVendor}
              className="flex-1 bg-gray-900 text-white py-3 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={handleModal}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
