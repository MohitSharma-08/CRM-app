import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

import Home from "../Components/pages/Home";
import Inbox from "../Components/pages/Inbox";
import Search from "../Components/pages/Search";
import Users from "../Components/pages/Vendors";
import Roles from "../Components/pages/Roles";
import Settings from "../Components/pages/Settings";

export default function AppRoutes({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route
        element={
          <Layout
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
