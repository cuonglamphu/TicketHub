'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#FFEB3B]" style={pixelFont}>
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Contact Information */}
        <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
          <h2 className="text-2xl font-bold mb-6 text-[#FFEB3B]" style={pixelFont}>
            Get In Touch
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFEB3B] p-3 rounded-full">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-[#FFEB3B]" style={pixelFont}>Phone</h3>
                <p className="text-white">+84 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#FFEB3B] p-3 rounded-full">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-[#FFEB3B]" style={pixelFont}>Email</h3>
                <p className="text-white">contact@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#FFEB3B] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-[#FFEB3B]" style={pixelFont}>Address</h3>
                <p className="text-white">123 ABC Street, XYZ District, HCMC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
          <h2 className="text-2xl font-bold mb-6 text-[#FFEB3B]" style={pixelFont}>
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>
                Full Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>
                Subject
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-[#FFEB3B] mb-2" style={pixelFont}>
                Message
              </label>
              <textarea
                rows={4}
                className={`w-full px-4 py-2 bg-white text-black rounded ${pixelBorder}`}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] flex items-center justify-center gap-2`}
              style={pixelFont}
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}