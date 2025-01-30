import React from 'react';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import SectionTitle from './sectionTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubmittedMessageProps {
  onReset: VoidFunction;
}

export function SubmittedMessage({
  onReset,
}: SubmittedMessageProps): React.ReactNode {
  return (
    <div className="m-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-4 p-8 text-center md:p-0">
      <SectionTitle
        icon={BsFillInfoSquareFill}
        title="Thank You"
        description="Submit the form below and our team of experienced attorneys will
        review your information and send a preliminary assessment of your
        case based on your goals."
      />
      <Button onClick={onReset} size={'lg'} className="mt-8 w-full md:w-8/12">
        Go Back to Homepage
      </Button>
    </div>
  );
}
