import { useEffect } from 'react';

interface PageMeta {
  /** Page-specific part of the title; the site name is appended. */
  title: string;
  description: string;
}

const SITE_NAME = 'Gay Marie R. Pil';

/** Finds or creates a <meta>/<link> in <head> and sets one attribute on it. */
function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Per-route title, description and canonical.
 *
 * All four routes are served from the same index.html, so without this every
 * page shared the one title and description — a browser history and a set of
 * search results in which /about, /work and /contact are indistinguishable.
 *
 * Social crawlers do not run JavaScript, so the og:/twitter: card in
 * index.html stays the source of truth for link previews; this covers titles,
 * bookmarks, history and search engines that do render.
 */
export function usePageMeta({ title, description }: PageMeta): void {
  useEffect(() => {
    document.title = `${title} — ${SITE_NAME}`;

    upsert(
      'meta[name="description"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'description');
        return el;
      },
      'content',
      description,
    );

    // Taken from the live origin rather than a hardcoded domain, so this stays
    // correct across localhost, a preview deploy and the production host.
    upsert(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      },
      'href',
      `${window.location.origin}${window.location.pathname}`,
    );
  }, [title, description]);
}
