
import React, { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Heading1,
  Heading2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

type Command = "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList" 
  | "justifyLeft" | "justifyCenter" | "justifyRight" | "createLink" | "formatBlock";

export function RichTextEditor({ 
  value, 
  onChange,
  error,
  placeholder = "Start typing..." 
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: Command, value?: string) => {
    document.execCommand(command, false, value);
    saveContent();
    editorRef.current?.focus();
  };

  const handleCreateLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const handleHeading = (level: 1 | 2) => {
    execCommand("formatBlock", `<h${level}>`);
  };

  const saveContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    saveContent();
  };

  return (
    <div className="space-y-2 w-full">
      <div className={cn(
        "border rounded-t-lg p-2 bg-muted/20 flex flex-wrap gap-1",
        error && "border-destructive"
      )}>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("bold")}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("italic")}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("underline")}
          className="h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r mx-1 my-1" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 w-8"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r mx-1 my-1" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("justifyLeft")}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("justifyCenter")}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand("justifyRight")}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r mx-1 my-1" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleCreateLink}
          className="h-8 w-8"
        >
          <Link className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r mx-1 my-1" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => handleHeading(1)}
          className="h-8 w-8"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => handleHeading(2)}
          className="h-8 w-8"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
      </div>

      <div
        id="editor"
        ref={editorRef}
        contentEditable={true}
        className={cn(
          "border min-h-[200px] p-3 rounded-b-lg focus:outline-none focus:ring-1 focus:ring-ring",
          error && "border-destructive focus:ring-destructive",
          !value && !isFocused && "text-muted-foreground",
        )}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e: FormEvent<HTMLDivElement>) => saveContent()}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Instead of placeholder as a prop, we'll use a data-attribute and CSS
        data-placeholder={placeholder}
        style={{ 
          position: 'relative',
          wordBreak: 'break-word'
        }}
        onPaste={handlePaste}
      />
      
      {error && <p className="text-sm text-destructive">{error}</p>}
      
      <style>
        {`
          #editor:empty:before {
            content: attr(data-placeholder);
            color: #64748b;
            position: absolute;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
}
