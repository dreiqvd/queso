/** This file contains utility global functions */

import { BREAKPOINTS } from '@queso/common';

export function getViewportWidth(): number {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

export function getViewportHeight(): number {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}

export function getScrollTop(): number {
  return window.scrollY || document.documentElement.scrollTop;
}

export function isViewportSmall(): boolean {
  return getViewportWidth() <= BREAKPOINTS.TABLET_SM;
}
