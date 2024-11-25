import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category, CategoryFormData } from '@/types/category';
import { Tag, Link, FileText, Image as ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pixelBorder } from '@/lib/utils';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };
const inputClasses = "bg-white/90 border-2 border-black focus:border-[#FFEB3B] transition-colors";
const labelClasses = "text-[#FFEB3B] font-bold block mb-2 flex items-center gap-2";

export function CategoryForm({ isOpen, onClose, category, onSubmit }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    catName: '',
    catSlug: '',
    catDesc: '',
    catThumb: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        catName: category.catName,
        catSlug: category.catSlug,
        catDesc: category.catDesc,
        catThumb: category.catThumb
      });
    } else {
      setFormData({
        catName: '',
        catSlug: '',
        catDesc: '',
        catThumb: ''
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4CAF50] sm:max-w-[500px] border-4 border-black shadow-[8px_8px_0_0_#000000]">
        <DialogHeader>
          <DialogTitle className="text-[#FFEB3B] text-2xl text-center mb-4" style={pixelFont}>
            {category ? '🎮 Edit Category' : '🎮 New Category'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClasses} style={pixelFont}>
              <Tag className="h-5 w-5" /> Category Name
            </label>
            <Input
              value={formData.catName}
              onChange={(e) => setFormData(prev => ({ ...prev, catName: e.target.value }))}
              className={`${inputClasses} text-base`}
              required
            />
          </div>

          <div>
            <label className={labelClasses} style={pixelFont}>
              <Link className="h-5 w-5" /> Slug
            </label>
            <Input
              value={formData.catSlug}
              onChange={(e) => setFormData(prev => ({ ...prev, catSlug: e.target.value }))}
              className={`${inputClasses} text-base`}
              required
            />
          </div>

          <div>
            <label className={labelClasses} style={pixelFont}>
              <FileText className="h-5 w-5" /> Description
            </label>
            <Textarea
              value={formData.catDesc}
              onChange={(e) => setFormData(prev => ({ ...prev, catDesc: e.target.value }))}
              className={`${inputClasses} h-[100px] text-base`}
              required
            />
          </div>

          <div>
            <label className={labelClasses} style={pixelFont}>
              <ImageIcon className="h-5 w-5" /> Thumbnail URL
            </label>
            <Input
              value={formData.catThumb}
              onChange={(e) => setFormData(prev => ({ ...prev, catThumb: e.target.value }))}
              className={`${inputClasses} text-base`}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100 border-2 border-black text-black"
              style={pixelFont}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FFEB3B] hover:bg-[#FDD835] text-black border-2 border-black"
              style={pixelFont}
            >
              {category ? '🚀 Update' : '🚀 Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 