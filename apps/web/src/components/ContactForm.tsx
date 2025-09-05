"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const { toast } = useToast();

  const projectCategories = [
    "Construction",
    "Renovation",
    "Electrical",
    "Plumbing",
    "Interior Design",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || formData.name.length < 2) {
      toast.error("Validation Error Name must be at least 2 characters long.");
      return;
    }

    if (!formData.email || !formData.email.includes("@")) {
      toast("Validation Error  Please enter a valid email address.");
      return;
    }

    if (!formData.message || formData.message.length < 20) {
      toast.error(
        "Validation Error Message must be at least 20 characters long."
      );
      return;
    }

    if (!formData.category) {
      toast.error("Validation Error Please select a project category.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would be a real API call
      console.log("Contact form submission:", formData);

      toast.success(
        "Message Sent! Thank you for your interest. We'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        category: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Get In Touch</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Project Category" />
          </SelectTrigger>
          <SelectContent>
            {projectCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Tell us about your project (minimum 20 characters)"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
          required
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
