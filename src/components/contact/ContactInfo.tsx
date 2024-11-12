import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="bg-gray-900 rounded-lg p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" 
            style={{ fontFamily: "'VT323', monospace" }}>
          Thông Tin Liên Hệ
        </h2>
        <p className="text-gray-300 mb-6">
          Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào. 
          Chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFEB3B] p-3 rounded-full">
            <Phone className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-[#FFEB3B]">Điện thoại</h3>
            <p className="text-gray-300">+84 123 456 789</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#FFEB3B] p-3 rounded-full">
            <Mail className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-[#FFEB3B]">Email</h3>
            <p className="text-gray-300">contact@example.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#FFEB3B] p-3 rounded-full">
            <MapPin className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-[#FFEB3B]">Địa chỉ</h3>
            <p className="text-gray-300">123 Đường ABC, Quận XYZ, TP.HCM</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#FFEB3B] p-3 rounded-full">
            <Clock className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-[#FFEB3B]">Giờ làm việc</h3>
            <p className="text-gray-300">Thứ 2 - Thứ 6: 9:00 - 18:00</p>
            <p className="text-gray-300">Thứ 7: 9:00 - 12:00</p>
          </div>
        </div>
      </div>
    </div>
  );
} 