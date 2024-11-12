'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log(formData);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-[#FFEB3B]">Họ và tên</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-[#FFEB3B] focus:border-[#FFEB3B] text-white"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-[#FFEB3B]">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-[#FFEB3B] focus:border-[#FFEB3B] text-white"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-2 text-[#FFEB3B]">Tiêu đề</label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-[#FFEB3B] focus:border-[#FFEB3B] text-white"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-[#FFEB3B]">Nội dung</label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-[#FFEB3B] focus:border-[#FFEB3B] text-white"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-[#FFEB3B] text-black font-bold rounded-lg hover:bg-[#FDD835] transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          <Send className="w-5 h-5" />
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
} 