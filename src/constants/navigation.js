import {
  House,
  ShoppingBag,
  FolderOpen,
  Info,
  Phone,
} from "lucide-react";

export const navigation = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: House,
  },
  {
    id: 2,
    label: "Shop",
    path: "/shop",
    icon: ShoppingBag,
  },
  {
    id: 3,
    label: "Projects",
    path: "/projects",
    icon: FolderOpen,
  },
  {
    id: 4,
    label: "About",
    path: "/about",
    icon: Info,
  },
  {
    id: 5,
    label: "Contact",
    path: "/contact",
    icon: Phone,
  },
];