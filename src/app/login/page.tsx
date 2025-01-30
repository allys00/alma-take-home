'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema, loginSchema } from './login.definitions';
import { FormErrorMessage } from '@/components/shared/formErrorMessage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/reducer/auth/authSlice';
import { doLogin } from '@/service/auth.api';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const { token } = await doLogin(data);

    dispatch(login(token));
    router.push('/leads');
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
          width={96}
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
        <Button
          disabled={isSubmitting}
          className="m-auto mb-8 w-full"
          variant="default"
        >
          Login
        </Button>
      </form>
    </main>
  );
}
