import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const theme = writable<'light' | 'dark'>(
  browser ? (window.localStorage.getItem('theme') as 'light' | 'dark' | undefined) : undefined
);

theme.subscribe((t) => {
  if (browser) window.localStorage.setItem('theme', t);
});

export { theme };
