import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-md w-full`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-bold text-white" style={pixelFont}>{title}</h2>
            <Button variant="ghost" onClick={onClose} className="text-[#FFEB3B] hover:text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    );
  }     