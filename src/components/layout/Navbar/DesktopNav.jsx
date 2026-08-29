import { motion } from "framer-motion";
import { navigation } from "../../../constants/navigation";
import NavLinkItem from "./NavLinkItem";

const navVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      staggerChildren: 0.08,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function DesktopNav() {
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:block"
    >
     <ul className="flex items-center gap-8 xl:gap-9">
        {navigation.map((item) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
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