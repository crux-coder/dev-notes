'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import NoteWriter from './note-writer';
import SettingsDrawer from './settings-drawer';
import { createClient } from '@/utils/supabase/client';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/sign-in');
      }
    };

    checkUser();
  }, [router]);

  return (
    <RecoilRoot>
      <div className="flex w-full max-w-5xl flex-grow">
        <div className="flex flex-grow gap-4 items-center justify-center">
          <NoteWriter />
          <SettingsDrawer />
        </div>
      </div>
    </RecoilRoot>
  );
}
