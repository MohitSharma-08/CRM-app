{/* Users card */}
      <div className="flex justify-center mt-12">
        <div className="w-[60%] bg-[#0F1E33] rounded-xl p-6 shadow-xl border border-zinc-700 relative">
          <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Users</h2>

          <div className="grid grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="bg-[#12243D] p-4 rounded-lg hover:bg-[#1B3555] cursor-pointer border border-zinc-700"
              >
                <p className="text-zinc-100 text-lg font-semibold">
                  {user.name}
                </p>
                <p className="text-zinc-400">{user.agency}</p>
                <p className="text-zinc-500 text-sm">{user.location}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleModal()}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
          >
            + Create User
          </button>
        </div>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-[#0F1E33] p-6 rounded-xl w-[400px] border border-zinc-700">
            <h3 className="text-xl text-white font-semibold mb-4">
              User Details
            </h3>

            <div className="text-zinc-300 space-y-2">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Agency:</strong> {selectedUser.agency}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser.location}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>GST:</strong> {selectedUser.gst}
              </p>
              <p>
                <strong>PAN:</strong> {selectedUser.pan}
              </p>
              <p>
                <strong>Contact:</strong> {selectedUser.contact}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Password:</strong> ●●●●●●●
              </p>
            </div>

            <button
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showCreateModal && <Modal handleModal={handleModal} />}
