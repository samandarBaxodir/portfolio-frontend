"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/api";
import { getToken } from "@/lib/auth";

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getToken();
    if (!token) return;

    setUploading(true);
    try {
      const data = await uploadFile(file, token);
      onChange(data.url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Yuklashda xato yuz berdi");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {value ? (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border mb-1">
          <img
            src={value.startsWith("http") ? value : `http://127.0.0.1:8000${value}`}
            alt="Yuklangan rasm"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Upload size={20} />
          )}
          <span className="text-sm">
            {uploading ? "Yuklanmoqda..." : "Rasm tanlash"}
          </span>
        </button>
      )}
    </div>
  );
}
