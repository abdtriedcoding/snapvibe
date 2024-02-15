"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className: string;
};

const SubmitButton = ({ children, className }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {children}
    </button>
  );
};

export default SubmitButton;
