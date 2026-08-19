import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  /** Changing this clears the error — the router passes the pathname. */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

/**
 * Catches a render error in one page and shows a recoverable panel instead.
 *
 * Without this, a single thrown error unmounts the whole React tree and the
 * site goes blank — no nav, no footer, nothing to click. This sits inside the
 * shell, so the nav and footer survive and the visitor can still get to
 * another page rather than reaching for the back button.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    // A new route is a fresh chance to render — drop the previous error.
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page failed to render:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className={`pg container ${styles.wrap}`}>
        <div className="eyebrow">Something broke</div>

        <h1 className={styles.title}>
          This page didn&rsquo;t <span className={styles.accent}>load.</span>
        </h1>

        <p className={styles.copy}>
          Something went wrong rendering this page. The rest of the site still works — try another
          page from the nav, or reload.
        </p>

        <button type="button" className={styles.button} onClick={() => window.location.reload()}>
          Reload the page
        </button>

        {import.meta.env.DEV && <pre className={styles.detail}>{String(error.stack ?? error)}</pre>}
      </div>
    );
  }
}
