/**
 * Any update in breakpoints should be manually applied to:
 * - constants.ts (in libs/shared/common)
 * - tailwind.config.js
 * - _breakpoints.scss
 */
export const BREAKPOINTS = {
  MOBILE_SM: 360,
  MOBILE_MD: 480,
  TABLET_SM: 640,
  TABLET_MD: 768,
  DESKTOP_SM: 1024,
  DESKTOP_MD: 1366,
  DESKTOP_LG: 1367,
  SM_HEIGHT: 768,
};

export const SOCIAL_LINKS = [
  {
    url: 'https://www.linkedin.com/in/dreiqvd',
    name: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    url: 'https://github.com/dreiqvd',
    name: 'GitHub',
    icon: 'square-github',
  },
  {
    url: 'https://twitter.com/dreiqdev',
    name: 'X (Twitter)',
    icon: 'square-x-twitter',
  },
  {
    url: 'https://dreiqvd.medium.com',
    name: 'Medium',
    icon: 'square-medium',
  },
];
