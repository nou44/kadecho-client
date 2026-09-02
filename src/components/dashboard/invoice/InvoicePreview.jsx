
import { Mail, Phone, MapPin } from "lucide-react";

export default function InvoicePreview({
  invoice,
  subtotal = 0,
  discountAmount = 0,
  taxAmount = 0,
  total = 0,
}) {
  // =====================================================
  // HELPERS
  // =====================================================

  const formatMoney = (value) => {
    const number = Number(value || 0);

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =====================================================
  // DATA
  // =====================================================

  const items = invoice?.items || [];

  // =====================================================
  // SUMMARY ROW
  // =====================================================

  const SummaryRow = ({ label, value }) => {
    return (
      <div className="flex items-center justify-between gap-5">
        <span className="text-[10px] font-medium text-zinc-500">
          {label}
        </span>

        <span className="whitespace-nowrap text-[10px] font-semibold text-zinc-800">
          {value}
        </span>
      </div>
    );
  };

  // =====================================================
  // PREVIEW
  // =====================================================

  return (
    <div
      id="invoice-preview"
      className="
        relative
        mx-auto
        w-full
        max-w-[820px]
        min-h-[1080px]

        overflow-hidden

        rounded-[24px]

        border
        border-zinc-200

        bg-white
        text-zinc-900

        shadow-[0_30px_90px_rgba(0,0,0,0.12)]
      "
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* =====================================================
          TOP RED LINE
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-50

          h-[3px]

          bg-gradient-to-r
          from-red-600
          via-red-500
          to-red-400
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative

          min-h-[150px]

          border-b
          border-zinc-200

          px-7
          py-7

          sm:px-10
          sm:py-8
        "
      >
        {/* =================================================
            LOGO
            FIXED / PDF SAFE
        ================================================= */}

     <div
  className="
    absolute
    left-7
    top-7
    sm:left-10
    sm:top-8

    flex
    h-[58px]
    w-[210px]

    shrink-0
    items-center
    justify-start

    overflow-hidden
  "
  style={{
    width: "210px",
    height: "58px",
    flexShrink: 0,
    overflow: "hidden",
  }}
>
  <img
    src="/kadecho-logo-64.webp"
    alt="KADECHO"
    draggable={false}
    loading="eager"
    decoding="sync"
    className="
      block
      h-[58px]
      w-auto
      max-w-[210px]
      shrink-0

      object-contain
      object-left
    "
    style={{
      height: "58px",
      width: "auto",
      maxWidth: "210px",
      minWidth: "0",
      maxHeight: "58px",
      objectFit: "contain",
      objectPosition: "left center",
      display: "block",
      flexShrink: 0,
    }}
  />
</div>

        {/* =================================================
            INVOICE META
        ================================================= */}

        <div
          className="
            absolute
            right-7
            top-7

            text-right

            sm:right-10
            sm:top-8
          "
        >
          <div
            className="
              inline-flex
              items-center

              rounded-full

              border
              border-red-100

              bg-red-50

              px-3
              py-1
            "
          >
            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-500
              "
            >
              Invoice
            </span>
          </div>

          <h1
            className="
              mt-2

              text-[19px]
              font-bold
              tracking-tight
              text-zinc-950
            "
          >
            {invoice?.invoiceNumber || "INV-000000"}
          </h1>

          <div
            className="
              mt-1

              flex
              items-center
              justify-end
              gap-1.5

              text-[9px]
              text-zinc-400
            "
          >
            <span>Date</span>

            <span className="font-semibold text-zinc-600">
              {formatDate(invoice?.date)}
            </span>
          </div>
        </div>

        {/* =================================================
            BRAND SUBTITLE
        ================================================= */}

        <div
          className="
            absolute
            bottom-6
            left-7

            sm:bottom-7
            sm:left-10
          "
        >
          <div
            className="
              h-[1px]
              w-8
              bg-red-500
            "
          />

          <p
            className="
              mt-2

              text-[7px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-zinc-400
            "
          >
            Interior & Decoration
          </p>
        </div>
      </header>

      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-8

          border-b
          border-zinc-200

          px-7
          py-8

          sm:grid-cols-2
          sm:px-10
        "
      >
        {/* =================================================
            FROM
        ================================================= */}

        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-red-500
              "
            />

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-zinc-400
              "
            >
              From
            </p>
          </div>

          <p
            className="
              text-[13px]
              font-bold
              tracking-tight
              text-zinc-950
            "
          >
            KADECHO
          </p>

          <p className="mt-1 text-[9px] text-zinc-400">
            Interior & Decoration
          </p>

          <div
            className="
              mt-4
              space-y-1.5

              text-[9px]
              leading-4
              text-zinc-500
            "
          >
            <p>Morocco</p>

            <p>+212 XX XX XX XX</p>

            <p className="break-all">
              contact@kadecho.com
            </p>
          </div>
        </div>

        {/* =================================================
            CLIENT
        ================================================= */}

        <div
          className="
            min-w-0

            sm:text-right
          "
        >
          <div
            className="
              mb-4

              flex
              items-center
              gap-2

              sm:justify-end
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-red-500
              "
            />

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-zinc-400
              "
            >
              Bill To
            </p>
          </div>

          <p
            className="
              break-words

              text-[13px]
              font-bold
              tracking-tight
              text-zinc-950
            "
          >
            {invoice?.client?.name || "Client Name"}
          </p>

          <div
            className="
              mt-3
              space-y-1.5

              text-[9px]
              leading-4
              text-zinc-500
            "
          >
            {invoice?.client?.email && (
              <p className="break-all">
                {invoice.client.email}
              </p>
            )}

            {invoice?.client?.phone && (
              <p className="break-words">
                {invoice.client.phone}
              </p>
            )}

            {invoice?.client?.address && (
              <p className="break-words">
                {invoice.client.address}
              </p>
            )}

            {!invoice?.client?.email &&
              !invoice?.client?.phone &&
              !invoice?.client?.address && (
                <p className="text-zinc-400">
                  Client information
                </p>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          ITEMS
      ===================================================== */}

      <section
        className="
          px-7
          py-8

          sm:px-10
          sm:py-9
        "
      >
        <div
          className="
            mb-4

            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-zinc-400
              "
            >
              Order Details
            </p>

            <p
              className="
                mt-1
                text-[10px]
                text-zinc-400
              "
            >
              Products & services
            </p>
          </div>

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-zinc-300
            "
          >
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div
          className="
            w-full
            overflow-hidden

            rounded-[16px]

            border
            border-zinc-200
          "
        >
          <table
            className="
              w-full
              table-fixed
              border-collapse
            "
          >
            <thead>
              <tr className="bg-zinc-950">
                <th
                  className="
                    w-[52%]

                    px-4
                    py-3

                    text-left

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                  "
                >
                  Description
                </th>

                <th
                  className="
                    w-[12%]

                    px-2
                    py-3

                    text-center

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                  "
                >
                  Qty
                </th>

                <th
                  className="
                    w-[17%]

                    px-2
                    py-3

                    text-right

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                  "
                >
                  Price
                </th>

                <th
                  className="
                    w-[19%]

                    px-3
                    py-3

                    text-right

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                  "
                >
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => {
                  const quantity = Number(
                    item.quantity || 0
                  );

                  const price = Number(
                    item.price || 0
                  );

                  const itemTotal =
                    quantity * price;

                  return (
                    <tr
                      key={item.id || index}
                      className="
                        border-t
                        border-zinc-100
                        bg-white
                      "
                    >
                      <td
                        className="
                          px-4
                          py-4
                          align-top
                        "
                      >
                        <p
                          className="
                            break-words
                            whitespace-normal

                            text-[10px]
                            font-semibold
                            leading-5
                            text-zinc-800
                          "
                        >
                          {item.description ||
                            "Product / Service"}
                        </p>
                      </td>

                      <td
                        className="
                          px-2
                          py-4

                          text-center
                          align-top

                          text-[10px]
                          font-medium
                          text-zinc-500
                        "
                      >
                        {quantity}
                      </td>

                      <td
                        className="
                          whitespace-nowrap
                          px-2
                          py-4

                          text-right
                          align-top

                          text-[10px]
                          text-zinc-500
                        "
                      >
                        {formatMoney(price)} DH
                      </td>

                      <td
                        className="
                          whitespace-nowrap
                          px-3
                          py-4

                          text-right
                          align-top

                          text-[10px]
                          font-bold
                          text-zinc-900
                        "
                      >
                        {formatMoney(itemTotal)} DH
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="
                      px-4
                      py-10

                      text-center

                      text-[10px]
                      text-zinc-400
                    "
                  >
                    No invoice items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          LOWER SECTION
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-10

          border-t
          border-zinc-200

          px-7
          py-9

          sm:px-10
          xl:grid-cols-[1fr_280px]
        "
      >
        {/* =================================================
            THANK YOU / CONTACT
        ================================================= */}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-red-500
              "
            />

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-zinc-400
              "
            >
              Thank You
            </p>
          </div>

          <p
            className="
              mt-3
              max-w-md

              text-[10px]
              leading-5
              text-zinc-500
            "
          >
            Thank you for choosing KADECHO.
            We appreciate your business.
          </p>

          {/* CONTACT */}

          <div
            className="
              mt-6

              grid
              grid-cols-1
              gap-3

              text-[9px]
              text-zinc-400

              sm:grid-cols-3
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <Mail
                size={12}
                strokeWidth={1.6}
                className="shrink-0 text-zinc-400"
              />

              <span className="break-all">
                contact@kadecho.com
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <Phone
                size={12}
                strokeWidth={1.6}
                className="shrink-0 text-zinc-400"
              />

              <span>
                +212 XX XX XX XX
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <MapPin
                size={12}
                strokeWidth={1.6}
                className="shrink-0 text-zinc-400"
              />

              <span>Morocco</span>
            </div>
          </div>
        </div>

        {/* =================================================
            TOTAL CARD
        ================================================= */}

        <div
          className="
            relative

            rounded-[18px]

            border
            border-zinc-200

            bg-zinc-50

            p-5
          "
        >
          {/* Accent */}

          <div
            className="
              absolute
              left-0
              top-5
              h-8
              w-[2px]
              rounded-r-full
              bg-red-500
            "
          />

          <div className="space-y-3">
            <SummaryRow
              label="Subtotal"
              value={`${formatMoney(subtotal)} DH`}
            />

            <SummaryRow
              label="Discount"
              value={`- ${formatMoney(
                discountAmount
              )} DH`}
            />

            <SummaryRow
              label={`Tax (${invoice?.tax || 0}%)`}
              value={`${formatMoney(
                taxAmount
              )} DH`}
            />

            <div className="border-t border-zinc-200 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-zinc-400
                    "
                  >
                    Total Due
                  </p>

                  <div
                    className="
                      mt-1
                      h-[2px]
                      w-8
                      bg-red-500
                    "
                  />
                </div>

                <div className="text-right">
                  <span
                    className="
                      font-bebas

                      text-[30px]
                      leading-none
                      tracking-wide
                      text-zinc-950
                    "
                  >
                    {formatMoney(total)}
                  </span>

                  <span
                    className="
                      ml-1
                      text-[11px]
                      font-bold
                      text-red-500
                    "
                  >
                    DH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PAYMENT / STATUS STRIP
      ===================================================== */}

      <section
        className="
          mx-7
          mb-8

          rounded-[16px]

          border
          border-red-100

          bg-red-50/50

          px-5
          py-4

          sm:mx-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-500
              "
            >
              KADECHO
            </p>

            <p
              className="
                mt-1
                text-[9px]
                text-zinc-500
              "
            >
              Interior & Decoration
            </p>
          </div>

          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-zinc-400
              sm:text-right
            "
          >
            Thank you for your business
          </p>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          absolute
          bottom-0
          left-0
          right-0

          flex
          min-h-[42px]

          items-center
          justify-between

          bg-zinc-950

          px-7
          py-3

          sm:px-10
        "
      >
        <p
          className="
            text-[7px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-zinc-400
          "
        >
          KADECHO
        </p>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-1
              w-1
              rounded-full
              bg-red-500
            "
          />

          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.18em]
              text-zinc-600
            "
          >
            Interior & Decoration
          </p>
        </div>
      </footer>
    </div>
  );
}

