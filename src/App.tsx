import { useState, useEffect } from 'react';
import { StarBackground } from './components/StarBackground';
import { DraggableWindow } from './components/DraggableWindow';
import { Volume2, VolumeX, User, Link2, Images } from 'lucide-react';

function App() {
  const [windows, setWindows] = useState({
    about: false,
    links: false,
    gallery: false
  });
  const [isMuted, setIsMuted] = useState(false);
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);
  const [windowZ, setWindowZ] = useState<Record<keyof typeof windows, number>>({
    about: 50,
    links: 50,
    gallery: 50,
  });
  const [zCounter, setZCounter] = useState(60);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Array foto-foto pets
  const petImages = [
    '/assets/img/cat-1.webp',
    '/assets/img/cat-2.webp',
    '/assets/img/cat-3.webp',
    '/assets/img/cat-4.webp',
    '/assets/img/cat-5.webp',
    '/assets/img/dog-6.webp',
    '/assets/img/cat-7.webp',
    '/assets/img/cat-8.webp',
    '/assets/img/cat-9.webp',
  ];

  const toggleMute = () => setIsMuted(prev => !prev);

  const bringWindowToFront = (key: keyof typeof windows) => {
    setWindowZ(prev => ({
      ...prev,
      [key]: zCounter,
    }));
    setZCounter(prev => prev + 1);
  };

  const toggleWindow = (key: keyof typeof windows) => {
    const isOpening = !windows[key];

    if (isOpening) {
      bringWindowToFront(key);
    }

    setWindows(prev => ({ ...prev, [key]: !prev[key] }));

    if (!isMuted) {
      const soundFile = windows[key] ? '/sfx/button-click-2.mp3' : '/sfx/button-click-1.mp3';
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio play failed", e));
    }
  };

  const openFullSizeImage = (image: string) => {
    setFullSizeImage(image);
    if (!isMuted) {
      const audio = new Audio('/sfx/button-click-1.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio play failed", e));
    }
  };

  const closeFullSizeImage = () => {
    setFullSizeImage(null);
    if (!isMuted) {
      const audio = new Audio('/sfx/button-click-2.mp3');
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
        zIndex={windowZ.about}
        onFocus={() => bringWindowToFront('about')}
        isMobile={isMobile}
        stickyHeader={
          <>
            <div className="flex items-center gap-6">
              {/* Profile Photo */}
              <img
                src="/cat-pfp.webp"
                alt="Tirtha"
                className="w-28 h-28 rounded-full object-cover border-2 border-neutral-700 flex-shrink-0"
              />
              {/* Name & Info */}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-mono text-white">Nyoman Tirtha Yuda</h2>
                <p className="text-lg text-neutral-400">a computer science student</p>
                <p className="text-base text-neutral-500">currently studying at Manado State Polytechnic</p>
              </div>
            </div>
            <div className="border-b border-neutral-700 mt-5" />
          </>
        }
      >
        <div className="space-y-4">
          <p>
            Hello! I'm Tirtha.
            I’m just someone who enjoys learning, building things, and figuring stuff out along the way.
          </p>
          <p>
            I like exploring ideas, trying new tools, and slowly turning thoughts into something real.
            No rush, just learning step by step.
          </p>
          <p>
            Thanks for stopping by.
          </p>
        </div>
      </DraggableWindow>

      <DraggableWindow
        title="links.html"
        isOpen={windows.links}
        onClose={() => toggleWindow('links')}
        initialPosition={{ x: 20, y: 20 }}
        isMuted={isMuted}
        windowClassName="w-auto"
        zIndex={windowZ.links}
        onFocus={() => bringWindowToFront('links')}
        isMobile={isMobile}
      >
        {/* links container: left-align on mobile, center on larger screens */}
        <div className="flex flex-wrap justify-start sm:justify-center gap-8 p-4" style={{ maxWidth: 'calc(4 * (80px + 32px))' }}>
          {/* Discord */}
          <a
            href="https://discord.com/users/413216233530327042"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row sm:flex-col items-center gap-3 transition-colors w-full sm:w-20"
          >
            {/* card wraps icon and mobile text */}
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-[#5865F2]/20 transition-colors border border-neutral-700 group-hover:border-[#5865F2]/50 flex items-center justify-start sm:justify-center w-full">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 fill-neutral-400 group-hover:fill-[#5865F2] transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.699.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0856 2.157 2.419 0 1.3332-.946 2.4189-2.157 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0856 2.157 2.419 0 1.3332-.946 2.4189-2.157 2.4189z" />
              </svg>
              {/* mobile label inside card */}
              <span className="ml-2 text-xs sm:text-sm font-mono text-neutral-500 group-hover:text-[#5865F2] transition-colors sm:hidden">
                Discord
              </span>
            </div>
            {/* desktop label below the card */}
            <span className="hidden sm:block text-sm font-mono text-neutral-500 group-hover:text-[#5865F2] transition-colors">
              Discord
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/txrtha/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row sm:flex-col items-center gap-3 transition-colors w-full sm:w-20"
          >
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-[#E1306C]/20 transition-colors border border-neutral-700 group-hover:border-[#E1306C]/50 flex items-center justify-start sm:justify-center w-full">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 fill-neutral-400 group-hover:fill-[#E1306C] transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="ml-2 text-xs sm:text-sm font-mono text-neutral-500 group-hover:text-[#E1306C] transition-colors sm:hidden">
                Instagram
              </span>
            </div>
            <span className="hidden sm:block text-sm font-mono text-neutral-500 group-hover:text-[#E1306C] transition-colors">
              Instagram
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/NyomanTirtha"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row sm:flex-col items-center gap-3 transition-colors w-full sm:w-20"
          >
            <div className="p-4 rounded-xl bg-neutral-800/50 group-hover:bg-white/10 transition-colors border border-neutral-700 group-hover:border-white/30 flex items-center justify-start sm:justify-center w-full">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 fill-neutral-400 group-hover:fill-white transition-colors group-hover:scale-110 duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="ml-2 text-xs sm:text-sm font-mono text-neutral-500 group-hover:text-white transition-colors sm:hidden">
                GitHub
              </span>
            </div>
            <span className="hidden sm:block text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
              GitHub
            </span>
          </a>
        </div>
      </DraggableWindow>

      <DraggableWindow
        title="gallery.jpg"
        isOpen={windows.gallery}
        onClose={() => toggleWindow('gallery')}
        initialPosition={{ x: -20, y: 40 }}
        isMuted={isMuted}
        windowClassName="w-[900px]"
        zIndex={windowZ.gallery}
        onFocus={() => bringWindowToFront('gallery')}
        isMobile={isMobile}
      >
        <div className="px-6 pb-6">
          <h2 className="text-3xl font-mono text-white mb-4 font-bold">
            PETS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {petImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer bg-neutral-800 transition-transform duration-300 ease-out transform-gpu hover:scale-105"
                style={{ willChange: 'transform' }}
                onClick={() => openFullSizeImage(image)}
              >
                <img
                  src={image}
                  alt={`Pet ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </DraggableWindow>

      {/* Full Size Image Modal */}
      {fullSizeImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          style={{ zIndex: 9999 }}
          onClick={closeFullSizeImage}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={fullSizeImage}
              alt="Full size pet"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Desktop View - Card Window */}
        <div className="hidden md:block w-full max-w-3xl min-h-[450px] bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl animate-fade-in-up flex flex-col overflow-hidden">
          {/* Window Header */}
          <div className="h-10 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between px-4 relative">
            <span className="text-sm font-medium text-neutral-400">home</span>
          </div>

          {/* Window Content */}
          <div className="flex-1 flex flex-col items-center justify-center mt-10 p-12 gap-10">
            <div className="text-center space-y-2">
              <h1 className="text-6xl font-mono text-white tracking-tight">
                hi! <span className="font-bold">i'm tirtha</span>
              </h1>
              <p className="text-xl text-neutral-400 leading-relaxed max-w-lg mx-auto">
                welcome to a quieter space
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => toggleWindow('about')}
                className="px-8 py-4 bg-neutral-800 text-neutral-300 rounded-lg text-base border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
                style={{
                  willChange: 'transform',
                  transition: 'transform 0.15s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
              >
                <User size={24} />
                <span>About</span>
              </button>
              <button
                onClick={() => toggleWindow('links')}
                className="px-8 py-4 bg-neutral-800 text-neutral-300 rounded-lg text-base border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
                style={{
                  willChange: 'transform',
                  transition: 'transform 0.15s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
              >
                <Link2 size={24} />
                <span>Links</span>
              </button>
              <button
                onClick={() => toggleWindow('gallery')}
                className="px-8 py-4 bg-neutral-800 text-neutral-300 rounded-lg text-base border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
                style={{
                  willChange: 'transform',
                  transition: 'transform 0.15s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
              >
                <Images size={24} />
                <span>Gallery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View - No Card */}
        <div className="md:hidden w-full flex flex-col items-center justify-center px-4 py-12 gap-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-mono text-white tracking-tight">
              hi! <span className="font-bold">i'm tirtha</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              welcome to a quieter space
            </p>
          </div>

          <div className="w-full flex gap-3">
            <button
              onClick={() => toggleWindow('about')}
              className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-300 rounded-lg text-sm border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
              style={{
                willChange: 'transform',
                transition: 'transform 0.15s ease-out'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <User size={20} />
              <span>About</span>
            </button>
            <button
              onClick={() => toggleWindow('links')}
              className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-300 rounded-lg text-sm border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
              style={{
                willChange: 'transform',
                transition: 'transform 0.15s ease-out'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Link2 size={20} />
              <span>Links</span>
            </button>
            <button
              onClick={() => toggleWindow('gallery')}
              className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-300 rounded-lg text-sm border border-neutral-700 flex flex-col items-center gap-2 transform-gpu"
              style={{
                willChange: 'transform',
                transition: 'transform 0.15s ease-out'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Images size={20} />
              <span>Gallery</span>
            </button>
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
