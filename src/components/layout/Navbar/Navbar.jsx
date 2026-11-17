
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

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          border-b
          transition-[background-color,border-color,box-shadow]
          duration-300
          ${
            scrolled
              ? "border-white/10 bg-[#090909] shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              : "border-white/[0.06] bg-[#0b0b0b]"
          }
        `}
      >
        <Container>
          <div
            className="
              relative flex h-[64px] w-full
              items-center justify-between
              sm:h-[68px]
              lg:h-[72px]
            "
          >
            {/* LOGO */}
            <div className="relative z-10 shrink-0">
              <Logo />
            </div>

            {/* DESKTOP NAV */}
            <div
              className="
                absolute left-1/2
                hidden w-[445px]
                -translate-x-1/2
                items-center justify-center
                lg:flex
              "
            >
              <DesktopNav />
            </div>

            {/* DESKTOP ACTIONS */}
            <div
              className="
                relative z-10 ml-auto
                hidden shrink-0
                items-center gap-2
                lg:flex
              "
            >
              <SearchButton />

              <CartButton
                onClick={() => setCartOpen(true)}
              />

              <UserButton />
            </div>

            {/* MOBILE ACTIONS */}
            <div
              className="
                ml-auto flex items-center
                gap-1.5 lg:hidden
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
