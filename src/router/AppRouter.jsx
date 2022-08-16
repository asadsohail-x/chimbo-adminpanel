import { Routes, Route } from "react-router-dom";

import { MdSpaceDashboard, MdFeaturedPlayList } from "react-icons/md";
import { HiUsers, HiBell } from "react-icons/hi";
import { BsGearFill } from "react-icons/bs";
import { TiWarning } from "react-icons/ti";

import Dashboard from "../views/dashboard/Dashboard";
import Settings from "../views/settings/Settings";
import Users from "../views/users/Users";
import Listings from "../views/listings/Listings";
import PropertyTypes from "../views/property-types/PropertyTypes";
import ListingTypes from "../views/listingTypes/ListingTypes";
import HeatingTypes from "../views/heating-types/HeatingTypes";
import OccupationTypes from "../views/occupationTypes/OccupationTypes";
import ListingFeatures from "../views/listingFeatures/ListingFeatures";
import Specifications from "../views/specifications/Specifications";
import RoomCharacteristics from "../views/roomCharacteristics/RoomCharacteristics";
import Complaints from "../views/complaints/Complaints";
import Notifications from "../views/notifications/Notifications";
import Genders from "../views/genders/Genders";

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
        title: "Listings",
        path: "/listings",
      },
      {
        title: "Property Types",
        path: "/property-types",
      },
      {
        title: "Listing Types",
        path: "/listing-types",
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
        title: "Listing Features",
        path: "/listing-features",
      },
    ],
  },
  {
    icon: <HiUsers size={20} />,
    title: "Users",
    children: [
      {
        title: "Users",
        path: "/users",
      },
      {
        title: "Genders",
        path: "/genders",
      },
    ],
  },
  // {
  //   icon: <HiBell size={20} />,
  //   title: "Notifications",
  //   children: [
  //     {
  //       title: "Notifications",
  //       path: "/notifications",
  //     },
  //     {
  //       title: "Notification Types",
  //       path: "/notification-types",
  //     },
  //   ],
  // },
  {
    icon: <TiWarning size={20} />,
    title: "Complaints",
    path: "/complaints",
  },
  {
    icon: <HiBell size={20} />,
    title: "Notifications",
    path: "/notifications",
  },
  {
    icon: <BsGearFill size={20} />,
    title: "Settings",
    path: "/settings",
  },
];

export const AuthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="listings" element={<Listings />} />
    <Route path="add-listing" element={<>Add Listing</>} />
    <Route path="property-types" element={<PropertyTypes />} />
    <Route path="listing-types" element={<ListingTypes />} />
    <Route path="heating-types" element={<HeatingTypes />} />
    <Route path="occupation-types" element={<OccupationTypes />} />
    <Route path="room-characteristics" element={<RoomCharacteristics />} />
    <Route path="specifications" element={<Specifications />} />
    <Route path="listing-features" element={<ListingFeatures />} />
    <Route path="users" element={<Users />} />
    <Route path="genders" element={<Genders />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="notification-types" element={<>Notification Types</>} />
    <Route path="complaints" element={<Complaints />} />
    <Route path="complaint-types" element={<>Complaint Types</>} />
    <Route path="settings" element={<Settings />} />
  </Routes>
);
