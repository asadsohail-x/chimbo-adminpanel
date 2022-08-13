import { Routes, Route } from "react-router-dom";

import { MdSpaceDashboard, MdFeaturedPlayList } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsGearFill } from "react-icons/bs";

import Dashboard from "../views/dashboard/Dashboard";
import Settings from "../views/settings/Settings";
import Users from "../views/users/Users";
import PropertyTypes from "../views/property-types/PropertyTypes";

export const routes = [
  {
    icon: <MdSpaceDashboard size={20} />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <MdFeaturedPlayList size={20} />,
    title: "Listings",
    children: [
      {
        title: "Property Types",
        path: "/property-types",
      },
      {
        title: "Heating Types",
        path: "/heating-types",
      },
      {
        title: "Occupation Types",
        path: "/occupation-types",
      },
      {
        title: "Room Characteristics",
        path: "/room-characteristics",
      },
      {
        title: "Specifications",
        path: "/specifications",
      },
      {
        title: "Features",
        path: "/features",
      },
    ],
  },
  {
    icon: <HiUsers size={20} />,
    title: "Users",
    path: "/users",
  },
  {
    icon: <BsGearFill size={20} />,
    title: "Settings",
    path: "/settings",
  },
];

export const AppRoutes = () => <AuthenticatedRoutes />;

export const AuthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="login" element={<div>Login</div>} />
    <Route path="property-types" element={<PropertyTypes />} />
    <Route path="heating-types" element={<div>Heating Types</div>} />
    <Route path="occupation-types" element={<div>Occupation Types</div>} />
    <Route
      path="room-characteristics"
      element={<div>Room Characteristics</div>}
    />
    <Route path="specifications" element={<div>Specifications</div>} />
    <Route path="features" element={<div>Features</div>} />
    <Route path="users" element={<Users />} />
    <Route path="settings" element={<Settings />} />
  </Routes>
);

export const UnAuthenticatedRoutes = () => <></>;
