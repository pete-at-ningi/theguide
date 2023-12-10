import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import PageAuthWrapper from '../components/Auth/PageAuthWrapper';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <PageAuthWrapper>
        <Component {...pageProps} />
      </PageAuthWrapper>
    </SessionContextProvider>
  );
}
export default MyApp;
