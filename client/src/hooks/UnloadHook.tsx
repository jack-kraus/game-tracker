"use client";

import { useEffect } from 'react';


export default function UnloadHook(changes? : boolean) {
    changes ??= true;
    
    useEffect(() => {
        const handleBeforeUnload = (event : BeforeUnloadEvent) => {
          event.preventDefault();
          return changes;
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};