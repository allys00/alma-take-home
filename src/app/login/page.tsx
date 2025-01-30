'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema, loginSchema } from './login.definitions';
import { FormErrorMessage } from '@/components/shared/formErrorMessage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data }),
    // });

    // if (response.ok) {
    router.push('/dashboard');
    // } else {
    //   // Handle errors
    // }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-8 text-center md:p-0"
      >
        <Image
          src="/logo.png"
          alt="logo"
          height={35}
          width={100}
          className="mb-8"
        />
        <Input type="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage message={errors.email?.message} />

        <Input
          type="password"
          placeholder="password"
          {...register('password')}
        />
        <FormErrorMessage message={errors.password?.message} />
        <Button className="m-auto mb-8 w-full" variant="default">
          Submit
        </Button>
      </form>
    </main>
  );
}
