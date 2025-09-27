"use client";

import { Suspense } from "react";
import Link from "next/link";

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! Page not found
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}