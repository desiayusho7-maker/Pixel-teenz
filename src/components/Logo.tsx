export default function Logo() {
  return (
    <a href="#top" className="flex items-center shrink-0 group" aria-label="Pixel Teenz home">
      <img
        src="/logo.png"
        alt="Pixel Teenz logo"
        className="block h-9 sm:h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
        loading="eager"
      />
    </a>
  );
}
