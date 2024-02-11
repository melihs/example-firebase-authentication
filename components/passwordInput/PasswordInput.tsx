"use client";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";

const PasswordInput = ({ handleChange, values, errors, touched }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-20">
      <Input
        size="lg"
        label="Password"
        name="password"
        labelPlacement="outside"
        placeholder="Enter your password"
        className="outline-0"
        endContent={
          <button
            className="outline-0 focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
            ) : (
              <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        onChange={handleChange}
        value={values?.password}
        errorMessage={errors?.password}
        isInvalid={(errors?.password && touched?.password) as boolean}
      />
    </div>
  );
};

export default PasswordInput;
