"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronDown,
  ThumbsUp,
  Send,
  User,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface QA {
  id: string;
  question: string;
  answer: string;
  askedBy: string;
  answeredBy: string;
  isOfficial: boolean;
  date: string;
  helpful: number;
}

interface ProductQAProps {
  productId: string;
}

// Generate mock Q&A data
function generateMockQA(productId: string): QA[] {
  const questions = [
    {
      question: "Does this product come with a warranty?",
      answer:
        "Yes, this product comes with a 1-year manufacturer warranty covering defects in materials and workmanship.",
      askedBy: "John D.",
      answeredBy: "ElectroThings Support",
      isOfficial: true,
    },
    {
      question: "Is this compatible with older models?",
      answer:
        "This product is backward compatible with most models from the last 3-5 years. Please check the specifications for detailed compatibility information.",
      askedBy: "Sarah M.",
      answeredBy: "ElectroThings Support",
      isOfficial: true,
    },
    {
      question: "How long does the battery last?",
      answer:
        "Based on my experience, the battery lasts about 8-10 hours with moderate use. Heavy usage might reduce this to around 6 hours.",
      askedBy: "Mike R.",
      answeredBy: "Verified Buyer",
      isOfficial: false,
    },
    {
      question: "Can I use this while charging?",
      answer:
        "Yes, you can use the product while it's charging without any issues. This is a common practice and won't affect the battery life.",
      askedBy: "Lisa K.",
      answeredBy: "ElectroThings Support",
      isOfficial: true,
    },
  ];

  return questions.map((q, i) => ({
    ...q,
    id: `${productId}-qa-${i}`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    helpful: Math.floor(Math.random() * 30),
  }));
}

export function ProductQA({ productId }: ProductQAProps) {
  const [qaList] = useState<QA[]>(() => generateMockQA(productId));
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleHelpful = (id: string) => {
    const newHelpful = new Set(helpfulIds);
    if (newHelpful.has(id)) {
      newHelpful.delete(id);
    } else {
      newHelpful.add(id);
    }
    setHelpfulIds(newHelpful);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    toast.success("Your question has been submitted! We'll respond within 24-48 hours.");
    setQuestion("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">
            Questions & Answers ({qaList.length})
          </h3>
        </div>
        <Button
          variant={showForm ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Ask a Question"}
        </Button>
      </div>

      {/* Ask Question Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitQuestion}
            className="bg-muted/50 rounded-lg p-4 space-y-3"
          >
            <Textarea
              placeholder="Type your question about this product..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!question.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Submit Question
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative">
        <Input placeholder="Search questions..." className="pr-10" />
        <MessageCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Q&A List */}
      <div className="space-y-4">
        {qaList.map((qa, index) => (
          <motion.div
            key={qa.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Collapsible
              open={expandedIds.has(qa.id)}
              onOpenChange={() => toggleExpanded(qa.id)}
            >
              <CollapsibleTrigger asChild>
                <div className="w-full flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary font-medium">Q:</span>
                      <span className="font-medium">{qa.question}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{qa.askedBy}</span>
                      <span>•</span>
                      <span>{qa.date}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      expandedIds.has(qa.id) && "rotate-180"
                    )}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-4 mt-2 p-4 bg-muted/30 rounded-lg border-l-2 border-primary"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-medium">A:</span>
                    <div className="flex-1">
                      <p className="text-sm">{qa.answer}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {qa.isOfficial ? (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              <Store className="mr-1 h-3 w-3" />
                              {qa.answeredBy}
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <User className="mr-1 h-3 w-3" />
                              {qa.answeredBy}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 text-xs",
                            helpfulIds.has(qa.id) && "text-primary"
                          )}
                          onClick={() => handleHelpful(qa.id)}
                        >
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          Helpful ({qa.helpful + (helpfulIds.has(qa.id) ? 1 : 0)})
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
