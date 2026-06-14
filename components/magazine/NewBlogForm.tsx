"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronDown, FileText } from "lucide-react";
import { useEffect } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import type { BlogCreateRequest, Category } from "@/types/api";

const blogFormSchema = z.object({
  title: z.string().trim().min(1, "عنوان بلاگ را وارد کنید."),
  category: z.string().min(1, "دسته‌بندی را انتخاب کنید."),
  content: z.string().trim().min(1, "متن بدنه بلاگ را وارد کنید."),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const SERVER_FIELD_MAP: Partial<Record<string, keyof BlogFormValues>> = {
  title: "title",
  category: "category",
  content: "content",
};

function applyServerErrors(
  error: unknown,
  setError: UseFormSetError<BlogFormValues>,
) {
  if (!axios.isAxiosError(error) || !error.response?.data) {
    setError("root", {
      type: "server",
      message: "خطا در ثبت بلاگ. لطفاً دوباره تلاش کنید.",
    });
    return;
  }

  const data = error.response.data;

  if (typeof data === "string") {
    setError("root", { type: "server", message: data });
    return;
  }

  if (typeof data !== "object" || data === null) {
    setError("root", {
      type: "server",
      message: "خطا در ثبت بلاگ. لطفاً دوباره تلاش کنید.",
    });
    return;
  }

  let hasMappedError = false;

  for (const [key, value] of Object.entries(data)) {
    const message = Array.isArray(value) ? value[0] : String(value);

    if (key === "detail" || key === "non_field_errors") {
      setError("root", { type: "server", message });
      hasMappedError = true;
      continue;
    }

    const field = SERVER_FIELD_MAP[key];
    if (field) {
      setError(field, { type: "server", message });
      hasMappedError = true;
    }
  }

  if (!hasMappedError) {
    setError("root", {
      type: "server",
      message: "خطا در ثبت بلاگ. لطفاً دوباره تلاش کنید.",
    });
  }
}

const defaultFormValues: BlogFormValues = {
  title: "",
  category: "",
  content: "",
};

interface NewBlogFormProps {
  categories: Category[];
  isOpen: boolean;
  onSubmit: (data: BlogCreateRequest) => Promise<void>;
  onCancel: () => void;
}

export function NewBlogForm({
  categories,
  isOpen,
  onSubmit,
  onCancel,
}: NewBlogFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: defaultFormValues,
  });

  const resetForm = () => {
    reset(defaultFormValues);
    clearErrors();
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, reset, clearErrors]);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const onFormSubmit = async (values: BlogFormValues) => {
    clearErrors("root");

    try {
      await onSubmit({
        title: values.title,
        category: Number(values.category),
        content: values.content,
      });
      resetForm();
    } catch (error) {
      applyServerErrors(error, setError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        label="عنوان بلاگ"
        htmlFor="blog-title"
        error={errors.title?.message}
      >
        <div className="relative">
          <input
            id="blog-title"
            type="text"
            placeholder="مثال: راهنمای کامل خرید و سرمایه‌گذاری در..."
            className="w-full h-[40px] rounded-lg border border-gray-dark pl-4 pr-10 text-sm outline-none"
            {...register("title")}
          />
          <FileText
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-txt-secondary"
            aria-hidden="true"
          />
        </div>
      </FormField>

      <FormField
        label="دسته بندی"
        htmlFor="blog-category"
        error={errors.category?.message}
      >
        <div className="relative">
          <select
            id="blog-category"
            className="w-full h-[40px] appearance-none rounded-lg border border-gray-dark bg-white pl-10 pr-4 text-sm outline-none"
            {...register("category")}
          >
            <option value="" disabled>
              مثال: آموزشی
            </option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-txt-secondary"
            aria-hidden="true"
          />
        </div>
      </FormField>

      <FormField
        label="بدنه بلاگ"
        htmlFor="blog-content"
        error={errors.content?.message}
      >
        <textarea
          id="blog-content"
          rows={5}
          placeholder="متن بدنه بلاگ خود را بنویسید"
          className="w-full resize-none rounded-lg border border-gray-dark px-3 py-2 text-sm outline-none"
          {...register("content")}
        />
      </FormField>

      {errors.root?.message && (
        <p
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {errors.root.message}
        </p>
      )}

      <div className="flex flex-col-reverse md:flex-row gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          انصراف
        </Button>
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          ثبت و انتشار بلاگ
        </Button>
      </div>
    </form>
  );
}
