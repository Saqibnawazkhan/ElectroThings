"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface ShareProductProps {
  productName: string;
  productSlug: string;
}

export function ShareProduct({ productName, productSlug }: ShareProductProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const productUrl = typeof window !== "undefined"
    ? `${window.location.origin}/products/${productSlug}`
    : `/products/${productSlug}`;

  const shareText = `Check out ${productName} on ElectroThings!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: productUrl,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2] hover:text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#4267B2] hover:text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0077B5] hover:text-white",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(productName)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-[#25D366] hover:text-white",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-muted-foreground hover:text-white",
      url: `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(`${shareText}\n\n${productUrl}`)}`,
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Share this product</h4>
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNativeShare}
                className="text-xs"
              >
                More options
              </Button>
            )}
          </div>

          {/* Social Share Buttons */}
          <div className="flex justify-center gap-2">
            {shareLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${link.color}`}
                title={`Share on ${link.name}`}
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm truncate">
              {productUrl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
