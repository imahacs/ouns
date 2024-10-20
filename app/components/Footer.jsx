import Image from "next/image";
import React from "react";
import { logo } from "../../public/assets/assets";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative inline-flex p-0.5">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#E6E6FA] to-[#EAEFFA] rounded-lg"></div>

          {/* Your Logo/Image */}
          <Image src={logo} alt="Logo" height={40} className="relative z-10" />
        </div>

        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">حول</a>
          <a href="#">خدماتنا</a>
          <a href="#">كيف يعمل</a>
          <a href="#">المساعدة</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className=" mt-8">جميع الحقوق محفوظة &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
