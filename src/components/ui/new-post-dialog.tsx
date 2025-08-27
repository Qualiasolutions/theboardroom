"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { FileText, Users, TrendingUp } from "lucide-react";

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewPostDialog({ open, onOpenChange }: NewPostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"discussion" | "announcement" | "update">("discussion");
  const [room, setRoom] = useState("");
  
  const addPost = useAppStore((state) => state.addPost);
  const addNotification = useAppStore((state) => state.addNotification);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      addNotification("Please fill in all required fields");
      return;
    }

    addPost({
      title,
      content,
      type,
      room: room || undefined,
      author: "Abdelrahman"
    });

    addNotification(`Post "${title}" created successfully!`);
    
    // Reset form
    setTitle("");
    setContent("");
    setType("discussion");
    setRoom("");
    onOpenChange(false);
  };

  const postTypes = [
    { value: "discussion", label: "Discussion", icon: Users, description: "Start a strategic discussion" },
    { value: "announcement", label: "Announcement", icon: FileText, description: "Share important news" },
    { value: "update", label: "Update", icon: TrendingUp, description: "Post a progress update" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-panel border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-gold">Create New Post</DialogTitle>
          <DialogDescription className="text-mid">
            Share insights, start discussions, or make announcements to the boardroom
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Type</label>
            <div className="grid grid-cols-3 gap-3">
              {postTypes.map((postType) => {
                const Icon = postType.icon;
                return (
                  <button
                    key={postType.value}
                    type="button"
                    onClick={() => setType(postType.value as typeof type)}
                    className={`p-3 border transition-all ${
                      type === postType.value
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">{postType.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title..."
              className="bg-background border-border"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, insights, or updates..."
              className="min-h-[150px] bg-background border-border"
              required
            />
          </div>

          {/* Room Selection (Optional) */}
          <div className="space-y-2">
            <label htmlFor="room" className="text-sm font-medium">
              Room (Optional)
            </label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full bg-background border border-border px-3 py-2 text-sm"
            >
              <option value="">Select a room...</option>
              <option value="general">General Strategy</option>
              <option value="investments">Investments & Opportunities</option>
              <option value="partnerships">Strategic Partnerships</option>
              <option value="operations">Operations & Growth</option>
            </select>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gold hover:bg-gold-soft text-background"
            >
              Create Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}