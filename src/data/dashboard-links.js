import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "My Listings",
    path: "/dashboard/my-listings",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "List Property",
    path: "/dashboard/add-listings",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Settings",
    path: "/dashboard/settings",
    icon: "VscSettingsGear",
  },
  {
    id: 6,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    icon: "VscSettingsGear",
  },
];