'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import NoteWriter from './note-writer';
import SettingsDrawer from './settings-drawer';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function ProtectedPage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <RecoilRoot>
      <div className="flex w-full max-w-5xl flex-grow">
        <div className="flex flex-grow gap-4 items-center justify-between">
          <NoteWriter />
          {!isDrawerOpen && <Button onClick={toggleDrawer} variant="outline" size="lg" className="p-2 self-start">
            <Settings />
          </Button>}
          <SettingsDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </div>
      </div>
    </RecoilRoot>
  );
}
