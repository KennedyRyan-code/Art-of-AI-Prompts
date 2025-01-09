"use client";
import { SessionProvider } from 'next-auth/react';

// Configure shared session state for all components in the app
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider