import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import InvoicesList from "../../components/dashboard/invoice/InvoicesList";

export default function SavedInvoices() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-[#090909]
          p-6
          sm:p-8
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-56
            w-56
            rounded-full
            bg-red-600/10
            blur-3xl
          "
        />

        {/* Top accent */}

        <div
          className="
            absolute
            left-0
            top-0
            h-[2px]
            w-full
            bg-gradient-to-r
            from-red-600
            via-red-400/50
            to-transparent
          "
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* TITLE */}

          <div>
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-500/15
                  bg-red-500/[0.06]
                  text-red-400
                "
              >
                <FileText size={19} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500">
                  Finance
                </p>

                <h1 className="mt-1 font-bebas text-4xl uppercase tracking-[0.06em] text-white sm:text-5xl">
                  Saved Invoices
                </h1>
              </div>

            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
              View and manage all invoices created from your Kadecho
              dashboard.
            </p>
          </div>

          {/* CREATE */}

          <Link
            to="/dashboard/invoices"
            className="
              group
              flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-red-400
              transition-all
              duration-300
              hover:border-red-500/40
              hover:bg-red-500
              hover:text-white
            "
          >
            <Plus
              size={15}
              className="transition-transform duration-300 group-hover:rotate-90"
            />

            Create Invoice
          </Link>

        </div>
      </div>


      {/* =====================================================
          INVOICES LIST
      ===================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0b0b0b]
          p-4
          sm:p-5
        "
      >

        <div className="mb-5 flex items-center justify-between">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-zinc-600">
              Invoice Archive
            </p>

            <h2 className="mt-1 text-sm font-semibold text-white">
              All Saved Invoices
            </h2>
          </div>

          <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-700">
            Live data
          </span>

        </div>

        <InvoicesList />

      </section>

    </div>
  );
}