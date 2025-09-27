"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Suspense } from "react";

function PageContent() {
  const { userProfile, } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      localStorage.setItem("user", JSON.stringify(formData));

      setEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <span className="font-semibold text-gray-700">ID:</span>
            <span>{userProfile.id}</span>

            <span className="font-semibold text-gray-700">Name:</span>
            {editing ? (
              <Input
                name="name"
                // value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <span>{userProfile.name}</span>
            )}

            <span className="font-semibold text-gray-700">First Name:</span>
            {editing ? (
              <Input
                name="first_name"
                // value={formData.first_name}
                onChange={handleChange}
              />
            ) : (
              <span>{userProfile.first_name}</span>
            )}

            <span className="font-semibold text-gray-700">Last Name:</span>
            {editing ? (
              <Input
                name="last_name"
                // value={formData.last_name ?? ""}
                onChange={handleChange}
              />
            ) : (
              <span>{userProfile.last_name ?? "—"}</span>
            )}

            <span className="font-semibold text-gray-700">Email:</span>
            <span>{userProfile.email}</span>

            <span className="font-semibold text-gray-700">Role:</span>
            <span className="capitalize">{userProfile.role}</span>

            <span className="font-semibold text-gray-700">Mobile:</span>
            {editing ? (
              <Input
                name="mobile"
                // value={formData.mobile ?? ""}
                onChange={handleChange}
              />
            ) : (
              <span>{userProfile.mobile ?? "—"}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function Page() {
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

export default Page;
