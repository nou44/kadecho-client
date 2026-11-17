
import { motion } from "framer-motion";

import { navigation } from "../../../constants/navigation";
import NavLinkItem from "./NavLinkItem";

const navVariants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      staggerChildren: 0.04,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function DesktopNav() {
  return (
    <motion.nav
      aria-label="Navigation principale"
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="hidden w-full lg:block"
    >
      <ul
        className="
          flex w-full items-center
          justify-between gap-3
        "
      >
        {navigation.map((item) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
            className="shrink-0"
          >
            <NavLinkItem
              to={item.path}
              label={item.label}
            />
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
