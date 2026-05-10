"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
}

export default function VideoPlayer({ isOpen, onClose, videoUrl, title, description }: VideoPlayerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors z-[110]"
        >
          <X size={32} />
        </button>

        <div className="w-full max-w-6xl space-y-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
          >
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>

          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight">{title}</h2>
            <p className="text-white/40 max-w-3xl leading-relaxed font-light">{description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
