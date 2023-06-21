"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SignInModal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        show={true}
        size="md"
        popup
        onClose={() => router.back()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {error && (
              <span className="text-md text-red-700 bg-red-500 p-2 rounded-md">
                {error}
              </span>
            )}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <div className="w-full">
              <Button
                {...{ isProcessing }}
                onClick={async () => {
                  setIsProcessing(true);
                  const response = await signIn("credentials", {
                    userId: email,
                    password,
                    redirect: false,
                    for: "sign-in",
                  });
                  if (response?.error) setError(response.error);
                  else router.back()
                  setIsProcessing(false);
                }}
              >
                Log in to your account
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
