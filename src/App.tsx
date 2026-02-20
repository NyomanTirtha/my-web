import { useState } from 'react';
import { StarBackground } from './components/StarBackground';
import { DraggableWindow } from './components/DraggableWindow';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [windows, setWindows] = useState({
    about: false,
    links: false,
    gallery: false
  });
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => setIsMuted(prev => !prev);

  const toggleWindow = (key: keyof typeof windows) => {
    setWindows(prev => ({ ...prev, [key]: !prev[key] }));

    if (!isMuted) {
      const soundFile = windows[key] ? '/sfx/button-click-2.mp3' : '/sfx/button-click-1.mp3';
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio play failed", e));
    }
  };

  return (
    <>
      <StarBackground />

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-6 left-6 z-50 p-2 text-neutral-400 hover:text-white transition-transform hover:scale-110 active:scale-90"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Active Windows */}
      <DraggableWindow
        title="about.txt"
        isOpen={windows.about}
        onClose={() => toggleWindow('about')}
        initialPosition={{ x: 0, y: 0 }}
        isMuted={isMuted}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </DraggableWindow>

      <DraggableWindow
        title="links.html"
        isOpen={windows.links}
        onClose={() => toggleWindow('links')}
        initialPosition={{ x: 20, y: 20 }}
        isMuted={isMuted}
        windowClassName="w-auto"
      >
        <div className="flex flex-wrap justify-center gap-8 p-4" style={{ maxWidth: 'calc(4 * (80px + 32px))' }}>
          {/* Discord */}
          <a href="https://discord.com/users/413216233530327042" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition-colors w-20">
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-[#5865F2]/20 transition-colors border border-neutral-700 group-hover:border-[#5865F2]/50">
              <svg
                className="w-8 h-8 fill-neutral-400 group-hover:fill-[#5865F2] transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.699.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0856 2.157 2.419 0 1.3332-.946 2.4189-2.157 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0856 2.157 2.419 0 1.3332-.946 2.4189-2.157 2.4189z" />
              </svg>
            </div>
            <span className="text-xs font-mono text-neutral-500 group-hover:text-[#5865F2] transition-colors">Discord</span>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/txrtha/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition-colors w-20">
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-[#E1306C]/20 transition-colors border border-neutral-700 group-hover:border-[#E1306C]/50">
              <svg
                className="w-8 h-8 fill-neutral-400 group-hover:fill-[#E1306C] transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="text-xs font-mono text-neutral-500 group-hover:text-[#E1306C] transition-colors">Instagram</span>
          </a>

          {/* GitHub */}
          <a href="https://github.com/NyomanTirtha" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition-colors w-20">
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-white/10 transition-colors border border-neutral-700 group-hover:border-white/30">
              <svg
                className="w-8 h-8 fill-neutral-400 group-hover:fill-white transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">GitHub</span>
          </a>
        </div>
      </DraggableWindow>

      <DraggableWindow
        title="gallery.jpg"
        isOpen={windows.gallery}
        onClose={() => toggleWindow('gallery')}
        initialPosition={{ x: -20, y: 40 }}
        isMuted={isMuted}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet quam id dui posuere blandit.
        </p>
      </DraggableWindow>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl min-h-[400px] bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl animate-fade-in-up flex flex-col overflow-hidden">
          {/* Window Header */}
          <div className="h-10 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between px-4 relative">
            <span className="text-sm font-medium text-neutral-400">home</span>
          </div>

          {/* Window Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-5xl font-mono text-white tracking-tight">
                hi! i'm tirtha
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto">
                welcome to a quieter space
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => toggleWindow('about')}
                className="px-6 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm transition-transform hover:scale-105 active:scale-95 border border-neutral-700"
              >
                About
              </button>
              <button
                onClick={() => toggleWindow('links')}
                className="px-6 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm transition-transform hover:scale-105 active:scale-95 border border-neutral-700"
              >
                Links
              </button>
              <button
                onClick={() => toggleWindow('gallery')}
                className="px-6 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm transition-transform hover:scale-105 active:scale-95 border border-neutral-700"
              >
                Gallery
              </button>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-6 text-neutral-500 text-sm">
          &copy; 2026 Tirtha
        </footer>
      </div>
    </>
  );
}

export default App;
