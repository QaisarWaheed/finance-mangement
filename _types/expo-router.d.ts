declare module 'expo-router' {
  import React from 'react';

  export type Href = string;

  export interface LinkType extends React.FC<any> {
    Trigger?: React.FC<any>;
    Preview?: React.FC<any>;
    Menu?: React.FC<any> & { MenuAction?: React.FC<any> };
  }

  export const Link: LinkType;
  export const useRouter: () => { push: (to: string) => void; back: () => void; dispatch?: (action: any) => void };
  export const StackActions: { replace: (to: string) => any };
  export const useSearchParams: () => Record<string, string | undefined>;
}

