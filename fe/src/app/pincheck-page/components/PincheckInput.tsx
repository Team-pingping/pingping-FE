"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function PasswordInput() {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Correct password that you are checking against
  const correctPassword = useMemo(() => ["1", "2", "3", "4"], []);

  // Function to check if the entered password is correct
  const checkPassword = useCallback(
    (inputPassword: string[]) => {
      if (inputPassword.every((char) => char !== "")) {
        if (JSON.stringify(inputPassword) === JSON.stringify(correctPassword)) {
          setError(false);
          router.push("/editmappin-page"); // Navigate if password is correct
        } else {
          setError(true); // Show error if password is incorrect
        }
      }
    },
    [correctPassword, router]
  );

  // Effect to handle key down events for number input and backspace
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (/^\d$/.test(key)) {
        const newPass = [...password];
        newPass[currentIndex] = key;
        setPassword(newPass);

        // Move to the next input field
        if (currentIndex < password.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }

        checkPassword(newPass); // Check the password after each change
      }

      if (key === "Backspace") {
        const newPass = [...password];
        newPass[currentIndex] = ""; // Clear the current input

        // Move back to the previous input field
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }

        setPassword(newPass);
        setError(false); // Reset error state
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, password, checkPassword]);

  // Effect to focus the correct input field based on current index
  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  // Generate unique IDs for each input field
  const inputKeys = useMemo(() => password.map(() => uuidv4()), [password]);

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center justify-start gap-4 mb-4">
        {password.map((char, index) => (
          <div
            key={inputKeys[index]} // Use generated UUID as the key
            className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg justify-start items-center gap-3 inline-flex
            ${error ? "border-2 border-primary-50" : ""}
            ${currentIndex === index ? "border-2 border-gray-950" : ""}`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="grow shrink basis-0 text-center w-full h-full bg-transparent outline-none text-2xl text-text-default"
              maxLength={1}
              value={char}
              readOnly
              style={{
                caretColor: "transparent", // Hide caret
              }}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-primary-50 text-left w-full max-w-sm">
          비밀번호가 일치하지 않아요
        </p>
      )}
    </div>
  );
}
