"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiBriefcase, FiMail, FiAward, FiBookOpen } from "react-icons/fi";

const navItems = [
  { icon: FiHome,          href: "/",        label: "Home" },
  { icon: FiUser,          href: "/about",   label: "About" },
  { icon: FiBookOpen,      href: "/education",    label: "Education & Certifications" },
  { icon: FiBriefcase,     href: "/work",    label: "Work" },
  { icon: FiAward,         href: "/awards",    label: "Awards & Recognitions" },
  { icon: FiMail,          href: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 top-0 h-full z-50 flex flex-col items-center justify-center gap-4 pr-5 menu-bar">
      {navItems.map(({ icon: Icon, href, label }) => {
        const active = pathname === href;
        return (
          <Link
            prefetch={false} key={href}
            href={href}
            title={label}
            className={`
              group relative flex items-center justify-center
              w-12 h-12 rounded-full
              transition-all duration-300
              ${active
                ? "bg-[#cc0000] shadow-lg shadow-red-900/50"
                : "bg-[#1e1e1e] hover:bg-[#cc0000]"
              }
            `}
          >
            <Icon
              className={`
                text-lg transition-colors duration-300
                ${active ? "text-white" : "text-gray-400 group-hover:text-white"}
              `}
            />
            {/* Tooltip */}
            <span
              className="
                absolute right-14 bg-[#cc0000] text-white text-xs
                px-3 py-1 rounded-full whitespace-nowrap
                opacity-0 group-hover:opacity-100
                translate-x-2 group-hover:translate-x-0
                transition-all duration-300 pointer-events-none
              "
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
