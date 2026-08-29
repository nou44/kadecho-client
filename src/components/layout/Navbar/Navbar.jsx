import { useEffect, useState } from "react";

import Container from "../../ui/Container";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import UserButton from "./UserButton";
import CartDrawer from "../../Cart/CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`
          sticky
          top-0
          z-50
          w-full

          border-b
          border-white/10

          bg-[#0b0b0b]

          transition-all
          duration-300

          ${
            scrolled
              ? "shadow-[0_10px_35px_rgba(0,0,0,.35)]"
              : "shadow-none"
          }
        `}
      >
        <Container>
          <div
            className="
              flex
              h-[72px]
              sm:h-[78px]
              lg:h-[84px]

              items-center
              justify-between

              transition-all
              duration-300
            "
          >

            {/* LOGO */}

            <Logo />


            {/* DESKTOP NAV */}

            <div className="hidden lg:flex flex-1 justify-center">
              <DesktopNav />
            </div>


            {/* DESKTOP ACTIONS */}

            <div
              className="
                hidden
                lg:flex

                items-center
                gap-2

                xl:gap-3
              "
            >
              <SearchButton />

              <CartButton
                onClick={() => setCartOpen(true)}
              />

              <UserButton />
            </div>


            {/* MOBILE */}

            <div
              className="
                flex
                items-center
                gap-1.5

                sm:gap-2

                lg:hidden
              "
            >
              <CartButton
                onClick={() => setCartOpen(true)}
              />

              <UserButton />

              <MobileNav />
            </div>

          </div>
        </Container>
      </header>


      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}