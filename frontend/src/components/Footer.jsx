import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-14 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            Puthean Ads
          </h2>

          <p className="text-gray-400 leading-7 text-sm">
            Modern ecommerce platform for fashion, t-shirts, shoes,
            accessories, and premium products with fast delivery and secure
            payment.
          </p>

         
          <div className="flex items-center gap-4 mt-6">
            <a
              href="/"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500 duration-300 flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="/"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 duration-300 flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="/"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-500 duration-300 flex items-center justify-center"
            >
              <FaTwitter />
            </a>

            <a
              href="/"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500 duration-300 flex items-center justify-center"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Home
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Products
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Categories
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Customer Service</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Help Center
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Return Policy
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

  
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Subscribe Newsletter
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Get updates about new products and special offers.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-cyan-400"
            />

            <button className="bg-cyan-500 hover:bg-cyan-600 duration-300 py-3 rounded-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>


      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Puthean Ads. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;