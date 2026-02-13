"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. Free shipping on orders over $50.",
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard.",
      },
      {
        question: "Do you ship internationally?",
        answer: "We ship to over 100 countries worldwide. International shipping times vary by location, typically 7-21 business days.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Simply initiate a return from your account.",
      },
      {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 3-5 business days after we receive your return. It may take an additional 5-10 days for the refund to appear on your statement.",
      },
    ],
  },
  {
    category: "Products & Warranty",
    questions: [
      {
        question: "Are all products genuine?",
        answer: "Yes, we are an authorized dealer for all brands we carry. Every product comes with manufacturer warranty and authenticity guarantee.",
      },
      {
        question: "What warranty do products have?",
        answer: "Warranty varies by product and manufacturer. Most electronics come with 1-2 year manufacturer warranty. Extended warranties are available at checkout.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Buy Now Pay Later options like Klarna and Afterpay.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers.",
      },
    ],
  },
];

export function FAQ3D() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (id: string) => {
    const newOpen = new Set(openQuestions);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenQuestions(newOpen);
  };

  // Filter FAQs based on search
  const filteredFaqs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(c => c.questions.length > 0)
    : faqs;

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30">
      {/* Background decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-2xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
          >
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Can't find what you're looking for? Our support team is always here to help.
          </p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 focus:border-primary"
            />
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Category tabs */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {faqs.map((category, index) => (
                <motion.button
                  key={category.category}
                  onClick={() => setActiveCategory(index)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    index === activeCategory
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {category.category}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {(searchQuery ? filteredFaqs : [faqs[activeCategory]]).map((category, catIndex) => (
              <div key={category.category}>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mb-2 font-medium">
                    {category.category}
                  </p>
                )}
                {category.questions.map((faq, index) => {
                  const id = `${catIndex}-${index}`;
                  const isOpen = openQuestions.has(id);

                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={cn(
                          "relative rounded-2xl border-2 overflow-hidden transition-all duration-300",
                          isOpen
                            ? "border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5"
                            : "border-border/50 hover:border-primary/30"
                        )}
                        style={{ perspective: 1000 }}
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleQuestion(id)}
                          className="w-full p-5 flex items-center justify-between text-left"
                        >
                          <span className="font-semibold pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                              isOpen
                                ? "bg-gradient-to-r from-primary to-purple-600 text-white"
                                : "bg-muted"
                            )}
                          >
                            {isOpen ? (
                              <Minus className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </motion.div>
                        </button>

                        {/* Answer */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                exit={{ y: -10 }}
                                className="px-5 pb-5"
                              >
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50"
          >
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to help you with any questions.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                Contact Support
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
