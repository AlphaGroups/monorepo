"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";

function PageContent() {
  const { userProfile, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    first_name: userProfile?.first_name || "",
    last_name: userProfile?.last_name || "",
    email: userProfile?.email || "",
    mobile: userProfile?.mobile || "",
    avatar: userProfile?.avatar || "",
  });
  const [imagePreview, setImagePreview] = useState(userProfile?.avatar || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setFormData(prev => ({
        ...prev,
        avatar: reader.result as string
      }));
    };
    reader.readAsDataURL(file);

    // Upload image to server
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("avatar", file);

    try {
      // This is a mock API call - in a real application, you would send the file to your backend
      // const response = await api.post('/users/upload-avatar', formDataUpload, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // For now, we'll simulate the upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would get the uploaded image URL from response.data.url
      // For simulation purposes, we'll use the data URL
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare the update data
      const updateData: any = {
        name: formData.name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
      };

      // Only include avatar if it was changed
      if (imagePreview !== userProfile.avatar) {
        updateData.avatar = imagePreview;
      }

      // In a real application, you would send the updated data to your backend
      // const response = await api.put('/users/profile', updateData);
      
      // For now, we'll simulate the update and show a success message
      updateUserProfile({
        ...userProfile,
        ...updateData
      });
      
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4 md:p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {imagePreview ? (
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarImage src={imagePreview} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
              )}
              {editing && (
                <Button
                  onClick={triggerFileSelect}
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  disabled={isUploading}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p className="text-sm font-medium">{userProfile.id}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm font-medium">{userProfile.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">First Name</label>
              {editing ? (
                <Input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              ) : (
                <p className="text-sm font-medium">{userProfile.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Last Name</label>
              {editing ? (
                <Input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              ) : (
                <p className="text-sm font-medium">{userProfile.last_name || "—"}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              {editing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              ) : (
                <p className="text-sm font-medium">{userProfile.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Mobile</label>
              {editing ? (
                <Input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              ) : (
                <p className="text-sm font-medium">{userProfile.mobile || "—"}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <p className="text-sm font-medium capitalize">{userProfile.role}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Account Created</label>
              <p className="text-sm font-medium">
                {userProfile.created_at 
                  ? new Date(userProfile.created_at).toLocaleDateString() 
                  : "—"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          {editing ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: userProfile.name || "",
                    first_name: userProfile.first_name || "",
                    last_name: userProfile.last_name || "",
                    email: userProfile.email || "",
                    mobile: userProfile.mobile || "",
                    avatar: userProfile.avatar || "",
                  });
                  setImagePreview(userProfile.avatar || "");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isUploading}>
                {isUploading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function ProfilePage() {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}

export default ProfilePage;