"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";

const LoginPage = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="space-y-3">
        <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
          <h1 className="font-semibold mb-3 text-2xl">
            Please log in to continue.
          </h1>
          <Button
            className="mt-4 w-full"
            variant={"default"}
            aria-disabled={pending}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Log in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
