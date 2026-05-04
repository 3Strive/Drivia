'use client';

import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { AuthShell } from './AuthComponents';
import { RegisterForm } from './RegForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useRouter } from 'next/navigation';
import VerifyToken from './VerifyToken';

type AuthView = 'login' | 'register' | 'verify' | 'forgot';

export default function Auth() {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  return (
    <AuthShell>
      {view === 'login' && (
        <LoginForm
          onSubmit={(email, pw) => {
            console.log('login', email, pw);
            router.push('/dashboard');
          }}
          onForgot={() => setView('forgot')}
          onRegister={() => setView('register')}
        />
      )}
      {view === 'register' && (
        <RegisterForm
          onSubmit={(data) => {
            setEmail(data.email);
            console.log('register', data);
            setView('verify');
          }}
          onLogin={() => setView('login')}
        />
      )}
      {view === 'verify' && (
        <VerifyToken onLogin={() => setView('login')} email={email} />
      )}

      {view === 'forgot' && (
        <ForgotPasswordForm onBack={() => setView('login')} />
      )}
    </AuthShell>
  );
}
