import { BookOpen, Heart } from '@phosphor-icons/react';
import Logo from '@/assets/images/Logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-white px-6 py-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src={Logo} alt="Baca Logo" className="w-full object-contain" />
          </div>
          <span className="font-medium tracking-tight text-neutral-900 text-sm leading-none">Baca</span>
          <span className="text-neutral-300 text-sm">·</span>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Library System</span>
        </div>

        {/* Center: Copyright */}
        <p className="text-xs text-neutral-400 font-medium flex items-center gap-1">
          © {year} Baca. From Made with
          <Heart size={11} weight="fill" className="text-danger-400 inline" />
          for readers.
        </p>

        {/* Right: Version badge */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <BookOpen size={13} className="text-neutral-300" />
          <span className="font-medium tabular-nums">v1.0.0</span>
        </div>

      </div>
    </footer>
  );
}
