import { VendorTable } from "../VendorTable";
import CreateVendorModal from "../Modal/CreateVendorModal";
import EditVendorModal from "../Modal/EditVendorModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { getVendors } from "@/api/ApiList";
import toast from "react-hot-toast";
import { deleteVendor } from "@/api/ApiList";

export default function Vendors() {
  const [showCreateVendorModal, setShowCreateVendorModal] = useState(false);
  const [showEditVendorModal, setShowEditVendorModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getVendors().then(setUsers).catch(console.error);
  }, []);

  const handleShowCreateVendor = () => {
    setShowCreateVendorModal(true);
  };

  const onEdit = (user) => {
    console.log("Editing vendor UID:", user.vendor_uid);
    setSelectedUser(user);
    setShowEditVendorModal(true);
  };

  // const onDelete = (vendor_uid) => {
  //   console.log("Delete vendor:", vendor_uid);
  // };

  const onDelete = async (vendor_uid) => {
  try {
    await deleteVendor(vendor_uid);
    setUsers((prev) => prev.filter((v) => v.vendor_uid !== vendor_uid));
    toast.success("Vendor deleted successfully");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete vendor");
  }
};


  return (
    <>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Vendors</p>

          <Button size="sm" onClick={handleShowCreateVendor}>
            <PlusIcon className="mr-1" size={16} />
            Add Vendors
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full">
          <div className="p-1 border">
            <VendorTable users={users} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>

      {showCreateVendorModal && (
        <CreateVendorModal
          handleModal={() => setShowCreateVendorModal(false)}
          users={users}
          setUsers={setUsers}
        />
      )}

      {showEditVendorModal && (
        <EditVendorModal
          selectedUser={selectedUser}
          handleModal={() => setShowEditVendorModal(false)}
          setUsers={setUsers}
        />
      )}
    </>
  );
}
