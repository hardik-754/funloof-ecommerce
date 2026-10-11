"use client";

import React, { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Eye,
  Edit2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your educational guide for parents...",
}) => {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end);
    const replacement = `${before}${selection || "text"}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + (selection ? selection.length : 4)
      );
    }, 10);
  };

  return (
    <div className="border border-wood-300 rounded-3xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* WYSIWYG Action Toolbar */}
      <div className="bg-cream-100/70 p-2.5 border-b border-wood-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertText("**", "**")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 font-bold transition-colors"
            title="Bold (**text**)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 transition-colors"
            title="Italic (*text*)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-wood-300 mx-1" />
          <button
            type="button"
            onClick={() => insertText("### ")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 transition-colors flex items-center gap-0.5 text-xs font-bold"
            title="Heading 3 (### Title)"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("- ")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 transition-colors"
            title="Bullet list (- Item)"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("1. ")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 transition-colors"
            title="Numbered list (1. Item)"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("> ")}
            className="p-1.5 rounded-lg hover:bg-wood-200 text-forest-900 transition-colors"
            title="Quote block (> Quote)"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* View / Edit Mode Switcher */}
        <div className="flex items-center bg-wood-200/60 p-0.5 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
              viewMode === "edit"
                ? "bg-white text-forest-900 shadow-sm"
                : "text-wood-600 hover:text-forest-900"
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
              viewMode === "preview"
                ? "bg-white text-forest-900 shadow-sm"
                : "text-wood-600 hover:text-forest-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Body */}
      {viewMode === "edit" ? (
        <textarea
          ref={textareaRef}
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-xs sm:text-sm text-forest-900 focus:outline-none font-sans leading-relaxed resize-y bg-cream-50/20"
        />
      ) : (
        <div className="p-6 text-xs sm:text-sm text-forest-900 space-y-4 max-h-96 overflow-y-auto leading-relaxed bg-cream-50/20">
          {value ? (
            value.split("\n\n").map((p, i) => {
              if (p.startsWith("### ")) {
                return (
                  <h3 key={i} className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-1">
                    {p.replace("### ", "")}
                  </h3>
                );
              }
              if (p.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-5 space-y-1 text-wood-800">
                    {p.split("\n").map((item, idx) => (
                      <li key={idx}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-wood-800">{p}</p>;
            })
          ) : (
            <p className="text-wood-400 italic">No content typed yet. Switch back to Write mode to compose.</p>
          )}
        </div>
      )}
    </div>
  );
};
