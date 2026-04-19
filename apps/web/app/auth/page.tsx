'use client';

import React, { useState } from 'react';
import { AuthShell, LoginForm, RegisterForm, ForgotPasswordForm } from '../../organisms/AuthComponents';

type AuthView = 'login' | 'register' | 'forgot';

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  return (
    <AuthShell>
      {view === 'login' && (
        <LoginForm
          onSubmit={(email, pw) => console.log('login', email, pw)}
          onForgot={() => setView('forgot')}
          onRegister={() => setView('register')}
        />
      )}
      {view === 'register' && (
        <RegisterForm
          onSubmit={data => console.log('register', data)}
          onLogin={() => setView('login')}
        />
      )}
      {view === 'forgot' && (
        <ForgotPasswordForm onBack={() => setView('login')} />
      )}
    </AuthShell>
  );
}
