"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin, FaDribbble,  } from "react-icons/fa";
import { FaX, FaCodepen, FaGithub } from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, href: "https://www.facebook.com/hilario.goes", label: "Facebook" },
  // { icon: FaX,   href: "https://x.com/hilar47",  label: "Twitter"  },
  { icon: FaInstagram, href: "https://www.instagram.com/hilar47/", label: "Instagram"},
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/hilario-goes", label: "LinkedIn"},
  { icon: FaDribbble, href: "https://dribbble.com/hilar47", label: "Dribbble"},
  { icon: FaCodepen, href: "https://codepen.io/hilar47", label: "CodePen"},
  { icon: FaGithub, href: "https://github.com/hilar47", label: "GitHub"},
];

export default function SocialBar() {
  return (
    <div className="fixed left-0 top-0 h-full z-50 flex flex-col items-center justify-center pl-5 gap-0 social-bar">
      {/* Top vertical line */}
      <div className="w-[1px] h-24 bg-white/20 mb-5" />

      {/* Icons */}
      <div className="flex flex-col items-center gap-5">
        {socials.map(({ icon: Icon, href, label }) => (
          <Link
            prefetch={false} key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
              group relative flex items-center justify-center
              w-10 h-10 rounded-full
              text-gray-400 hover:text-white
              transition-all duration-300
            "
          >
            {/* Hover red glow ring */}
            <span className="
              absolute inset-0 rounded-full border border-transparent
              group-hover:border-[#cc0000]
              group-hover:shadow-[0_0_12px_2px_rgba(204,0,0,0.4)]
              transition-all duration-300
            " />
            <Icon className="text-lg relative z-10 group-hover:text-[#cc0000] transition-colors duration-300" />

            {/* Tooltip */}
            <span className="
              absolute left-12 bg-[#cc0000] text-white text-xs
              px-3 py-1 rounded-full whitespace-nowrap
              opacity-0 group-hover:opacity-100
              -translate-x-2 group-hover:translate-x-0
              transition-all duration-300 pointer-events-none
            ">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom vertical line */}
      <div className="w-[1px] h-24 bg-white/20 mt-5" />
    </div>
  );
}
