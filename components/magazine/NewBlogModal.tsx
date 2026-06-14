"use client";

import { Modal } from "@/components/ui/Modal";
import type { BlogCreateRequest, Category } from "@/types/api";

import { NewBlogForm } from "./NewBlogForm";

interface NewBlogModalProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: BlogCreateRequest) => Promise<void>;
  onSuccess: () => void;
}

export function NewBlogModal({
  isOpen,
  categories,
  onClose,
  onSubmit,
  onSuccess,
}: NewBlogModalProps) {
  const handleSubmit = async (data: BlogCreateRequest) => {
    await onSubmit(data);
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="اضافه کردن بلاگ جدید">
      <NewBlogForm
        categories={categories}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
