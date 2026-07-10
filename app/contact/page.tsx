"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";

const NAV_ITEMS = ["Work", "About", "Skills", "Experience", "Awards", "Contact"];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hilario-goes", icon: <Linkedin size={15} /> },
  { label: "GitHub", href: "https://github.com/hilar47", icon: <Github size={15} /> },
  { label: "Instagram", href: "https://instagram.com/hilar47", icon: <Instagram size={15} /> },
  { label: "Facebook", href: "https://facebook.com/hilario.goes", icon: <Facebook size={15} /> },
  { label: "Dribbble", href: "https://dribbble.com/hilar47", icon: <span className="contact-social-icon-text">Db</span> },
  { label: "CodePen", href: "https://codepen.io/hilar47", icon: <span className="contact-social-icon-text">Cp</span> },
];

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const onNav = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "projects") router.push("/projects");
    else router.push("/" + page);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const field = (id: keyof typeof form, label: string, type = "text", isTextarea = false) => (
    <div className="contact-field-wrapper">
      <label htmlFor={id} className={`contact-label${focused === id ? " focused" : ""}`}>{label}</label>
      {isTextarea ? (
        <textarea id={id} rows={5} value={form[id]} onFocus={() => setFocused(id)} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, [id]: e.target.value })}
          className={`contact-input contact-textarea${focused === id ? " focused" : ""}`} />
      ) : (
        <input id={id} type={type} value={form[id]} onFocus={() => setFocused(id)} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, [id]: e.target.value })}
          className={`contact-input${focused === id ? " focused" : ""}`} />
      )}
    </div>
  );

  return (
    <div className="contact-page-root">
      {/* <CustomCursor /> */}
      <InnerNav />
      <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.28]" style={{ mixBlendMode: "soft-light" }}>
        <filter id="grainC"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#grainC)" />
      </svg>

      <div className="contact-inner">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="contact-hero">
          <p className="page-top-text">— Get In Touch</p>
          <h1 className="page-title">
            Contact <span>Me</span>
          </h1>
          <p className="page-description">Open to new opportunities — Whether you have a role in mind or just want to connect, I&apos;d love to hear from you.</p>
        </motion.div>

        <div className="contact-grid">
          {/* LEFT — contact details */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="contact-detail-block">
              <p className="contact-p">Email</p>
              <a href="mailto:hilariogoes47@gmail.com" className="contact-detail-link"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#a2e773"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(232,228,220)"; }}>
                hilariogoes47@gmail.com
              </a>
            </div>
            <div className="contact-detail-block">
              <p className="contact-p">Phone</p>
              <a href="tel:+971556329267" className="contact-detail-link"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#a2e773"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(232,228,220)"; }}>
                +971 556 329 267
              </a>
              <a href="tel:+919823675942" className="contact-detail-link contact-detail-link--muted"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#a2e773"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(232,228,220,0.45)"; }}>
                +91 982 367 5942
              </a>
            </div>
            <div className="contact-detail-block">
              <p className="contact-p">Location</p>
              <span className="contact-detail-text">Dubai, UAE</span>
            </div>
            <div className="contact-divider" />
            <div className="flex gap-3 flex-wrap contact-cta-row">
              <a href="mailto:hilariogoes47@gmail.com" className="contact-btn-primary">
                Send Email
              </a>
              <a href="https://wa.me/971556329267" target="_blank" rel="noopener noreferrer" className="contact-btn-secondary"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(162,231,115,0.4)"; (e.currentTarget as HTMLElement).style.color = "#a2e773"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,228,220,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(232,228,220,0.7)"; }}>
                WhatsApp
              </a>
            </div>
            <div>
              <p className="contact-social-heading">Find Me On</p>
              <div className="flex gap-4 flex-wrap">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className="contact-social-link"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#a2e773"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(232,228,220,0.35)"; }}>
                    {icon}
                    <span className="contact-social-label">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="contact-success">
                <div className="contact-success-icon">✓</div>
                <p className="contact-success-title">Message Sent</p>
                <p className="contact-success-body">Thanks for reaching out. I&apos;ll get back to you within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div>{field("name", "Full Name")}</div>
                  <div>{field("email", "Email Address", "email")}</div>
                </div>
                <div className="contact-form-row">
                  <div>{field("phone", "Phone Number", "tel")}</div>
                  <div>{field("subject", "Subject")}</div>
                </div>
                {field("message", "Message", "text", true)}
                <div className="contact-submit-row">
                  <button type="submit" className="contact-submit-btn">
                    Send Message
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1l4 4-4 4" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </form>
            )}
            <div className="contact-availability">
              <p className="contact-availability-text">
                <span className="contact-availability-highlight">Currently available</span> for freelance projects, consulting, and senior technical roles. Dubai-based and open to remote or hybrid opportunities — wherever great work needs doing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}