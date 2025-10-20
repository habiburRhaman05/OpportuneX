import { useState, forwardRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchableInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suggestions?: string[];
  error?: boolean;
}

export const SearchableInput = forwardRef<HTMLInputElement, SearchableInputProps>(
  ({ suggestions = [], error, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            ref={ref}
            className={cn("pl-10", className)}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 100)}
            error={error}
            {...props}
          />
        </div>
        
        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground text-sm"
                onClick={() => {
                  setInputValue(suggestion);
                  setIsOpen(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchableInput.displayName = "SearchableInput";