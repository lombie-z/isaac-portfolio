// Ambient types for third-party globals loaded at runtime (e.g. GSAP via CDN in
// some pulled 21st.dev components). Safe to trim once those components are reworked.
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

export {};
