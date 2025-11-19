import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('../src/components/ThreeScene'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="container">
      <header className="header">
        <h1>3D Mirror Cube</h1>
        <p>Drag to orbit ? Scroll to zoom ? Double-tap to center</p>
      </header>
      <section className="canvasWrap">
        <ThreeScene />
      </section>
      <footer className="footer">
        <span>Built with Next.js + React Three Fiber</span>
      </footer>
    </main>
  );
}
