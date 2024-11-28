import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pixelBorder } from "@/lib/utils";

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${pixelBorder} bg-[#4CAF50] text-white p-6`}>
        <DialogHeader>
          <DialogTitle 
            className="text-[#FFEB3B] text-2xl tracking-wider" 
            style={pixelFont}
          >
            ⚠️ Confirm Deletion ⚠️
          </DialogTitle>
          <DialogDescription 
            className="text-white mt-4 text-lg" 
            style={pixelFont}
          >
            Are you sure you want to delete this item?
            <br/>
            <span className="text-[#FFEB3B]">This action cannot be undone!</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className={`${pixelBorder} bg-white text-black hover:bg-gray-100`}
            style={pixelFont}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={onConfirm}
            className={`${pixelBorder}`}
            style={pixelFont}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 