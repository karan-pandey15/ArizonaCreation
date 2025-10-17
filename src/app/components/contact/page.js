"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Footer from "../footer/page";
import Navbar from "../navbar/page";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setForm({ name: "", email: "", message: "" });
  };

  return (
   <div> 
    <Navbar />
           <div className="h-20"></div>
     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8">
 
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Section - Contact Info */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 mb-8">
                Have questions about our furniture? Reach out to us — we'd love to help!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <p className="text-white font-medium">+91 72756 14320</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium break-all">arizonacreation@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Address</p>
                  <p className="text-white font-medium">
                    Balipur, Pratapgarh 230001<br />Near Durga Mandir
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex gap-3 mt-8">
              <div className="h-1 w-12 bg-gradient-to-r from-white to-transparent rounded-full"></div>
              <div className="h-1 w-8 bg-gradient-to-r from-gray-400 to-transparent rounded-full"></div>
              <div className="h-1 w-4 bg-gradient-to-r from-gray-600 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="p-8 md:p-12 bg-black">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Arizona Creation. All rights reserved.
        </div>
      </div>
    </div>
    <Footer />

    
    </div>
    
  );
}