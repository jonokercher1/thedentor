'use client';

import login, { type LoginResponse } from '@/api/auth/login';
import { Button, ButtonVariant, EmailField, Icon, IconName, OneTimePasscodeInput, useApiRequest, useToast } from '@dentor/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface ResetPasswordFormData {
  code: string[]
}

const ResetPassword: FC = () => {
  const router = useRouter();
  const { errorToast } = useToast();
  const { control, handleSubmit, setError, watch, formState: { errors } } = useForm<ResetPasswordFormData>({ mode: 'onSubmit' });
  const { isLoading, sendApiRequest } = useApiRequest<LoginResponse, ResetPasswordFormData>({
    request: login,
    onSuccess: () => router.push('/'),
    onError: () => errorToast('Unable to login'),
    setFieldError: (name, { message }) => setError(name as any, { message }),
  });

  const code = watch('code', []);
  const codeIsValid = code.filter(Boolean).length === 6;

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log('🚀 ~ file: page.tsx:26 ~ onSubmit ~ data:', data);
    // sendApiRequest(data)
  };

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <Icon
          name={IconName.EnvelopeOpen}
          className="w-10 h-10 mb-10"
        />

        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Password Reset</h1>
        <p className="text-base font-light text-neutral-900">We sent a code to <strong className="font-medium">hello@thedentor.com</strong></p>
      </header>

      <section className="w-full">
        <form action="">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <OneTimePasscodeInput
                onPasswordEntered={(code: string[]) => onSubmit({ code })}
                {...field}
                error={errors.code?.message}
              />
            )}
          />

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            onClick={handleSubmit(onSubmit)}
            fluid
            disabled={!codeIsValid}
            loading={isLoading}
          >
            Contine
          </Button>
        </form>

        <p className="text-neutral-900 font-light text-center mt-6">Didn't receive a code? <strong tabIndex={0} className="cursor-pointer text-accent-secondary font-medium">Resend Email</strong></p>

        <Link href="/login" className="text-accent-secondary">
          <div className="mt-12 flex items-center justify-center">
            <Icon
              name={IconName.ChevronLeft}
              className="w-10 h-10 text-accent-secondary"
            />
            <p className="text-center font-medium">Back to Login</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ResetPassword;