import React from 'react';

interface FormErrorMessageProps {
  message?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  message,
}) => {
  if (!message) return null;

  return <p className="text-sm text-red-500 text-left w-full">{message}</p>;
};
