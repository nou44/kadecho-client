export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    outline:
      "border border-zinc-700 hover:border-red-600 hover:text-red-500 text-white bg-transparent",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}