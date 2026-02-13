"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowUpRight,
  Sparkles,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Audio", href: "/categories/audio" },
    { name: "Gaming", href: "/categories/gaming" },
    { name: "Wearables", href: "/categories/wearables" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Track Order", href: "/track" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:bg-blue-600", gradient: "from-blue-500 to-blue-700" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:bg-sky-500", gradient: "from-sky-400 to-sky-600" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:bg-pink-600", gradient: "from-pink-500 to-purple-600" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:bg-red-600", gradient: "from-red-500 to-red-700" },
];

const contactInfo = [
  { icon: MapPin, text: "Shah Jee Boys Hostel, CUST University, Sihala Islamabad" },
  { icon: Phone, text: "+92 309 9865055" },
  { icon: Clock, text: "Mon-Fri: 9AM - 6PM" },
];

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
  };

  return (
    <footer
      ref={containerRef}
      className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-slate-300 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

      {/* Main Footer */}
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-6 group">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold"
              >
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ElectroThings
                </span>
              </motion.span>
            </Link>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
              Your destination for premium electronics and gadgets. Quality products,
              competitive prices, and exceptional service since 2024.
            </p>

            {/* Contact Info with icons */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 text-sm group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <p className="text-white font-semibold">Subscribe to our newsletter</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary h-12 pr-12"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="h-12 px-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Shop
              <span className="h-1 w-8 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 rounded-full" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Support
              <span className="h-1 w-8 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Company
              <span className="h-1 w-8 bg-gradient-to-r from-pink-500 to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 rounded-full" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Legal
              <span className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-slate-500 flex items-center gap-2"
            >
              &copy; {new Date().getFullYear()} ElectroThings. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>
              All rights reserved.
            </motion.p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 0.5, scale: 1.2 }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.gradient} blur-lg transition-all`}
                  />
                  <motion.div
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={social.href}
                      className={`relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-transparent ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
