import { motion } from "framer-motion";

export default function AnimatedLines() {
  const lines = [0, 1, 2];

  return (
   <div className="pointer-events-none absolute -top-20 right-0 z-0 w-full">
  <div className="relative h-[180px] w-full">

    {/* LINE 1 */}
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        right-0
        top-0
        h-[2px]
        w-[75%]
        origin-right
        bg-gradient-to-l
        from-red-500
        to-transparent
      "
    />

    {/* LINE 2 */}
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        right-0
        top-[42px]
        h-[2px]
        w-[70%]
        origin-right
        bg-gradient-to-l
        from-red-500
        to-transparent
      "
    />

    {/* LINE 3 */}
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        right-0
        top-[84px]
        h-[2px]
        w-[65%]
        origin-right
        bg-gradient-to-l
        from-red-500
        to-transparent
      "
    />

  </div>
</div>
  );
}