import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

export function CategoryForm({ isOpen, onClose, category }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
      });
    } else {
      setFormData({
        name: '',
        slug: '',
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4CAF50] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B]" style={pixelFont}>
            {category ? 'Edit Category' : 'Add Category'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white" style={pixelFont}>
              Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white"
              required
            />
          </div>
          <div>
            <label className="text-white" style={pixelFont}>
              Slug
            </label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="bg-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100"
              style={pixelFont}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FFEB3B] hover:bg-[#FDD835] text-black"
              style={pixelFont}
            >
              {category ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 