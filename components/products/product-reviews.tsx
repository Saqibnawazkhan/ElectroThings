"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

// Generate mock reviews based on product
function generateMockReviews(productId: string, count: number): Review[] {
  const reviewTemplates = [
    { title: "Excellent product!", content: "Exactly what I was looking for. Quality is top-notch and delivery was fast.", rating: 5 },
    { title: "Great value for money", content: "Works perfectly and the price is very reasonable. Would recommend to anyone.", rating: 5 },
    { title: "Very satisfied", content: "This product exceeded my expectations. Easy to use and well-built.", rating: 4 },
    { title: "Good but could be better", content: "Overall decent product. Some minor issues but nothing major.", rating: 4 },
    { title: "Solid purchase", content: "Does what it's supposed to do. No complaints here.", rating: 4 },
    { title: "Pretty good", content: "Happy with my purchase. Would buy again.", rating: 3 },
    { title: "Meets expectations", content: "Product is as described. Nothing special but gets the job done.", rating: 3 },
  ];

  const names = ["Alex M.", "Sarah K.", "James L.", "Emily R.", "Michael T.", "Lisa P.", "David W.", "Jessica H."];

  return Array.from({ length: Math.min(count, 8) }, (_, i) => {
    const template = reviewTemplates[i % reviewTemplates.length];
    const daysAgo = Math.floor(Math.random() * 60) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
      id: `${productId}-review-${i}`,
      author: names[i % names.length],
      rating: template.rating,
      date: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      title: template.title,
      content: template.content,
      helpful: Math.floor(Math.random() * 20),
      verified: Math.random() > 0.3,
    };
  });
}

function calculateRatingDistribution(rating: number) {
  // Generate approximate distribution based on average rating
  const base = rating / 5;
  return {
    5: Math.round(base * 60 + Math.random() * 10),
    4: Math.round(base * 25 + Math.random() * 10),
    3: Math.round((1 - base) * 10 + Math.random() * 5),
    2: Math.round((1 - base) * 3 + Math.random() * 2),
    1: Math.round((1 - base) * 2 + Math.random() * 2),
  };
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  const reviews = generateMockReviews(productId, reviewCount);
  const distribution = calculateRatingDistribution(rating);
  const totalDistribution = Object.values(distribution).reduce((a, b) => a + b, 0);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderStars = (count: number, size: "sm" | "md" = "sm") => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "h-4 w-4" : "h-5 w-5",
              i < count ? "fill-yellow-400 text-yellow-400" : "text-muted"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid sm:grid-cols-2 gap-8">
        {/* Average Rating */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <span className="text-5xl font-bold">{rating.toFixed(1)}</span>
            <div>
              {renderStars(Math.round(rating), "md")}
              <p className="text-sm text-muted-foreground mt-1">
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-3">{stars}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Progress
                value={(distribution[stars as keyof typeof distribution] / totalDistribution) * 100}
                className="h-2 flex-1"
              />
              <span className="text-sm text-muted-foreground w-8">
                {distribution[stars as keyof typeof distribution]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Customer Reviews</h3>

        <AnimatePresence>
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="border-b pb-6 last:border-0"
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium">{review.author}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>

                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-muted-foreground text-sm">{review.content}</p>

                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 text-xs",
                        helpfulReviews.has(review.id) && "text-primary"
                      )}
                      onClick={() => handleHelpful(review.id)}
                    >
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {reviews.length > 3 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 transition-transform",
                showAll && "rotate-180"
              )}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
