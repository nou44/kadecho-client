
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, MessageCircle, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How do I request a quote?",
    answer:
      "Send us your project details and we'll prepare a custom quotation.",
  },
  {
    question: "Do you build custom projects?",
    answer:
      "Yes, every project is fully customized to your needs.",
  },
  {
    question: "Do you work outside Tangier?",
    answer:
      "Yes, depending on the project and installation requirements.",
  },
  {
    question: "How long does production take?",
    answer:
      "Delivery time depends on the project size and complexity.",
  },
];

export default function ContactFAQ() {
  const [active, setActive] = useState(0);
  const idPrefix = useId();

  return (
    <section
      aria-labelledby={`${idPrefix}-heading`}
      className="
        relative overflow-hidden
        bg-[#050505]
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* SUBTLE TOP LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_35%_40%_at_50%_0%,rgba(185,28,28,0.045),transparent_100%)]
        "
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.06]
              px-3 py-1.5
            "
          >
            <MessageCircle size={12} className="text-red-400" />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-red-400
              "
            >
              FAQ
            </span>
          </div>

          <h2
            id={`${idPrefix}-heading`}
            className="
              mt-3 font-bebas
              text-[34px] leading-none
              tracking-[0.035em]
              text-white
              sm:text-[40px]
              lg:text-[44px]
            "
          >
            QUESTIONS{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-400 via-red-500 to-red-700
                bg-clip-text text-transparent
              "
            >
              & ANSWERS
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-3 h-[2px] w-14
              rounded-full
              bg-gradient-to-r
              from-red-600 to-transparent
            "
          />

          <p
            className="
              mx-auto mt-3 max-w-md
              text-[12px] leading-6
              text-zinc-400
            "
          >
            Everything you need to know before starting your project.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mt-7 space-y-2.5 sm:mt-8">
          {faqs.map((faq, index) => {
            const open = active === index;
            const questionId = `${idPrefix}-question-${index}`;
            const answerId = `${idPrefix}-answer-${index}`;

            return (
              <div
                key={faq.question}
                className={`
                  group relative overflow-hidden
                  rounded-xl border
                  transition-[background-color,border-color]
                  duration-200
                  ${
                    open
                      ? "border-red-500/25 bg-white/[0.035]"
                      : "border-white/[0.07] bg-white/[0.018] hover:border-white/[0.14]"
                  }
                `}
              >
                {/* ACTIVE RED LINE */}
                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute left-0 top-0 bottom-0
                    w-[2px]
                    bg-gradient-to-b
                    from-red-400 via-red-600 to-transparent
                    transition-opacity duration-200
                    ${open ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* QUESTION */}
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setActive(open ? -1 : index)}
                    className="
                      flex w-full items-center
                      justify-between gap-4
                      px-4 py-3.5
                      text-left
                      sm:px-5 sm:py-4
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-[-2px]
                      focus-visible:outline-red-500
                    "
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {/* NUMBER */}
                      <span
                        aria-hidden="true"
                        className={`
                          hidden h-7 w-7 shrink-0
                          items-center justify-center
                          rounded-lg text-[10px]
                          font-semibold
                          sm:flex
                          ${
                            open
                              ? "bg-red-500/10 text-red-400"
                              : "bg-white/[0.035] text-zinc-600"
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* QUESTION TEXT */}
                      <span
                        className={`
                          text-[12px] font-semibold
                          leading-5
                          sm:text-[13px]
                          transition-colors duration-200
                          ${open ? "text-white" : "text-zinc-300"}
                        `}
                      >
                        {faq.question}
                      </span>
                    </span>

                    {/* TOGGLE ICON */}
                    <span
                      aria-hidden="true"
                      className={`
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg border
                        transition-[background-color,border-color,color]
                        duration-200
                        ${
                          open
                            ? "border-red-500/25 bg-red-500/10 text-red-400"
                            : "border-white/[0.07] bg-white/[0.025] text-zinc-500"
                        }
                      `}
                    >
                      {open ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                </h3>

                {/* ANSWER */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!open}
                >
                  <div
                    className="
                      border-t border-white/[0.06]
                      px-4 pb-4 pt-3
                      sm:px-5 sm:pb-5
                    "
                  >
                    <p
                      className="
                        max-w-2xl
                        text-[12px] leading-[1.8]
                        text-zinc-400
                        sm:text-[13px]
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div
          className="
            mt-6 flex flex-wrap
            items-center justify-center
            gap-2 text-center
            text-[11px] text-zinc-500
          "
        >
          <span>Still have questions?</span>

          <Link
            to="/contact"
            className="
              group inline-flex items-center gap-1
              font-semibold text-red-400
              transition-colors duration-200
              hover:text-red-300
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-red-500
            "
          >
            Contact us
            <ArrowUpRight
              size={13}
              className="
                transition-transform duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
