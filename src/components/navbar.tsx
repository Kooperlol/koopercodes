"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-neutral-100"
        >
          Kooper
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isContact = item.href === "/contact";
            const isActive = isContact
              ? pathname === "/contact"
              : pathname === "/" && item.href.startsWith("/#");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
