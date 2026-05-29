"use client";
import Sidebar from "@/components/Sidebar";
import ContactForm from "@/components/ContactForm";
import { useEffect, useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaSkype } from "react-icons/fa";

const contactInfo = [
  {
    icon: FiPhone,
    label: "Phone Number (UAE)",
    value: "+971-556329267",
    href: "tel:+971556329267",
  },
  {
    icon: FiPhone,
    label: "Phone Number (India)",
    value: "+91-9823675942",
    href: "tel:+919823675942",
  },
  {
    icon: FiMail,
    label: "Email Address",
    value: "hilariogoes47@gmail.com",
    href: "mailto:hilariogoes47@gmail.com",
  },
  {
    icon: FiMapPin,
    label: "Address",
    value: "Dubai, UAE",
    href: "https://maps.app.goo.gl/F1tcdHfgx8ewV2j58",
  },
];


export default function Contact() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#111] text-white flex overflow-hidden relative px-16 pr-28 py-20">
      <div className="absolute top-0 left-0 w-[140px] h-[140px] bg-[#cc0000] rounded-br-[80px] z-0" />

      <div className="relative z-10 w-full mx-auto page-enter">
        {/* <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-[3px] bg-[#cc0000]" />
          <span className="text-[#cc0000] font-bold tracking-widest uppercase text-xs">Get In Touch</span>
        </div> */}
       <section className="title-section text-center text-sm-center revealator-slideup revealator-once revealator-delay1">
          <div className="position-relative" style={{ opacity: 1, transform: "none" }}>
            <h1>Contact <span>Me</span></h1>
            <span className="title-bg">GET IN TOUCH</span>
          </div>
        </section>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">

          {/* ── LEFT: Contact info cards ─────────────────────────── */}
          <div className="flex flex-col gap-4 pt-2">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-2">
              <span className="block w-6 h-[3px] bg-[#cc0000]" />
              <span className="text-[#cc0000] font-bold tracking-widest uppercase text-xs">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl font-black mb-6">
              Let's <span className="text-[#cc0000]">Talk</span>
            </h1>

            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`
                  group flex items-center gap-4
                  bg-[#1a1a1a] border border-white/5 rounded-2xl
                  px-5 py-4
                  hover:border-[#cc0000]/40
                  hover:shadow-[0_0_20px_rgba(204,0,0,0.1)]
                  hover:bg-[#1f1f1f]
                  transition-all duration-300
                  transition-delay-[${i * 60}ms]
                `}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Icon box */}
                <div className="
                  flex-shrink-0 w-12 h-12 rounded-xl
                  bg-[#cc0000]/10 border border-[#cc0000]/20
                  flex items-center justify-center
                  group-hover:bg-[#cc0000] group-hover:border-[#cc0000]
                  transition-all duration-300
                ">
                  <Icon className="text-[#cc0000] group-hover:text-white text-lg transition-colors duration-300" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white text-md group-hover:text-[#cc0000] transition-colors duration-300">
                    {value}
                  </p>
                </div>
              </a>
            ))}

          </div>

          {/* ── RIGHT: Form component ─────────────────────────────── */}
          <div className="
            p-8 md:p-10]
          ">
            <ContactForm />
          </div>

        </div>
      </div>

      <Sidebar />
    </main>
  );
}
