import { useColorScheme as _useColorScheme } from 'react-native';

// Always return 'light' to ensure light theme is used
export function useColorScheme(): 'light' | 'dark' {
  return 'light';
}
