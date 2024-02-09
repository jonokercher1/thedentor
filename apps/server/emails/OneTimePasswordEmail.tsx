import { OneTimePasswordNotificationData } from '@/notification/notifications/one-time-password/one-time-password.notification';
import { Html } from '@react-email/components';
import * as React from 'react';

export default function OneTimePasswordEmail({ user, token }: OneTimePasswordNotificationData) {
  return (
    <Html>
      <h1 style={{ color: '#000' }}>Here is your one time password</h1>
      <p style={{ color: '#000' }}>user: {user.name}</p>
      <p style={{ color: '#000' }}>token: {token}</p>
    </Html>
  );
}
