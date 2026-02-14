"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  type: "trending" | "recent" | "suggestion";
  text: string;
  category?: string;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect?: (suggestion: string) => void;
  show?: boolean;
}

export function SearchSuggestions({
  suggestions,
  onSelect,
  show = true,
}: SearchSuggestionsProps) {
  if (!show || suggestions.length === 0) return null;

  const grouped = suggestions.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchSuggestion[]>);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 rounded-lg border bg-white shadow-xl z-50"
        >
          <div className="max-h-96 overflow-y-auto p-2">
            {grouped.trending && grouped.trending.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Searches
                </div>
                <div className="space-y-1">
                  {grouped.trending.map((item, index) => (
                    <SuggestionItem
                      key={index}
                      suggestion={item}
                      onClick={() => onSelect?.(item.text)}
                      icon={TrendingUp}
                    />
                  ))}
                </div>
              </div>
            )}

            {grouped.recent && grouped.recent.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
                <div className="space-y-1">
                  {grouped.recent.map((item, index) => (
                    <SuggestionItem
                      key={index}
                      suggestion={item}
                      onClick={() => onSelect?.(item.text)}
                      icon={Clock}
                    />
                  ))}
                </div>
              </div>
            )}

            {grouped.suggestion && grouped.suggestion.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Suggestions
                </div>
                <div className="space-y-1">
                  {grouped.suggestion.map((item, index) => (
                    <SuggestionItem
                      key={index}
                      suggestion={item}
                      onClick={() => onSelect?.(item.text)}
                      icon={Search}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuggestionItem({
  suggestion,
  onClick,
  icon: Icon,
}: {
  suggestion: SearchSuggestion;
  onClick: () => void;
  icon: any;
}) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate">{suggestion.text}</span>
        {suggestion.category && (
          <span className="text-xs text-muted-foreground">
            in {suggestion.category}
          </span>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </motion.button>
  );
}
