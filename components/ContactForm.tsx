"use client";
import { useState } from "react";
import "./components.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API call
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#cc0000] flex items-center justify-center mb-6 shadow-[0_0_32px_rgba(204,0,0,0.4)]">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">I'll get back to you as soon as possible.</p>
        <button
          onClick={() => { setSent(false); setForm({ name:"", email:"", phone:"", subject:"", message:"" }); }}
          className="mt-8 text-sm text-[#cc0000] hover:underline font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-white mb-8">
        Let's grab a coffee and <span className="text-[#cc0000]">have a conversation</span>
      </h2>

      <div className="space-y-5 custom-form">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Your name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email address"
            name="email"
            type="email"
            placeholder="contact.me@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Your phone"
            name="phone"
            type="tel"
            placeholder="+971 1234567890"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <InputField
            label="Subject"
            name="subject"
            placeholder="I want to contact for..."
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-gray-300 mb-2 font-medium">
            Message <span className="text-[#cc0000]">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows={4}
            required
            className="
              w-full bg-[#1a1a1a] border border-white/8 rounded-xl
              px-5 py-4 text-white placeholder-gray-600 text-sm
              focus:outline-none focus:border-[#cc0000]/60
              focus:shadow-[0_0_0_3px_rgba(204,0,0,0.1)]
              transition-all duration-300 resize-none
            "
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            group flex items-center gap-3
            bg-[#cc0000] hover:bg-[#ff1a1a]
            text-white font-bold tracking-wide
            px-8 py-4 rounded-2xl
            transition-all duration-300
            shadow-[0_8px_24px_rgba(204,0,0,0.35)]
            hover:shadow-[0_12px_32px_rgba(204,0,0,0.5)]
            hover:-translate-y-0.5
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Reusable input field ────────────────────────────────────────────────────
type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
};

function InputField({ label, name, placeholder, value, onChange, type = "text", required }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2 font-medium">
        {label} {required && <span className="text-[#cc0000]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full bg-[#1a1a1a] border border-white/8 rounded-xl
          px-5 py-4 text-white placeholder-gray-600 text-sm
          focus:outline-none focus:border-[#cc0000]/60
          focus:shadow-[0_0_0_3px_rgba(204,0,0,0.1)]
          transition-all duration-300
        "
      />
    </div>
  );
}
