"use client";
import { useEffect, useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [nav, setNav] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div className="font-bravaslabs absolute left-0 top-0 z-50 ease-in duration-300">
      <div
        className={`m-auto flex w-screen justify-between items-center px-8 py-3 ${
          scrollPosition > 0
            ? "fixed drop-shadow-md bg-main bg-opacity-75"
            : "fixed shadow-none"
        }`}
      >
        <Link href="/">
          <div className="bg-white rounded-full">
            <Image
              priority
              className="p-2"
              draggable={false}
              src="/images/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
        </Link>
        <ul className="hidden font-bold text-lg text-white sm:flex">
          <li className="p-4 hover:text-secondary">
            <Link href="/#header">Home</Link>
          </li>
          <li className="p-4 hover:text-secondary">
            <Link href="/#about">About</Link>
          </li>
          <li className="p-4 hover:text-secondary">
            <Link href="/#technologies">Technologies</Link>
          </li>
          <li className="p-4 hover:text-secondary">
            <Link href="/#projects">Projects</Link>
          </li>
          <li className="p-4 hover:text-secondary">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-50">
          {nav ? <CloseIcon boxSize={17} /> : <HamburgerIcon boxSize={17} />}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden z-40 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-main text-center ease-in duration-300"
              : "sm:hidden z-40 absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-main text-center ease-in duration-300"
          }
        >
          <ul>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/#header">Home</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/#about">About</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/#technologies">Technologies</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/#projects">Projects</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-black">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
