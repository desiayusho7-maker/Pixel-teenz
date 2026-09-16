export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 group shrink-0">
      <span className="block h-9 w-36 sm:h-10 sm:w-40 overflow-hidden rounded-lg">
        <img
          src="/reference-theme.png"
          alt="Pixel Teenz logo"
          className="h-full w-full object-cover mix-blend-screen scale-125 group-hover:scale-[1.32] transition-transform duration-500"
          style={{ objectPosition: 'center 47%' }}
        />
      </span>
    </a>
  );
}
