import React from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Kendala interface error:', error, info);
  }

  private retry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <section className="max-w-lg border border-white/15 bg-white/5 p-8 md:p-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-5">Kendala recovery</p>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-5">The trail was interrupted</h1>
          <p className="text-sm leading-relaxed text-white/65 mb-8">
            The interface encountered an unexpected problem. Your saved journey data remains available.
          </p>
          <button
            type="button"
            onClick={this.retry}
            className="px-7 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/85 transition-colors"
          >
            Reload Kendala
          </button>
        </section>
      </main>
    );
  }
}
