import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4CAF50]">
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B]" style={pixelFont}>
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-white" style={pixelFont}>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white hover:bg-gray-100"
            style={pixelFont}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            style={pixelFont}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 