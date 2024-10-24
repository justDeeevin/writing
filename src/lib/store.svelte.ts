import { browser } from '$app/environment';

let theme = $state(browser ? (window.localStorage.getItem('theme') as 'light' | 'dark') : 'dark');

const store = {
  get theme() {
    return theme;
  },
  set theme(t) {
    theme = t;
    if (browser) window.localStorage.setItem('theme', theme);
  }
};

export default store;
