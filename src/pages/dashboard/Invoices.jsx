import { useMemo, useState } from "react";
import { Plus, Trash2, Save, FileText, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import InvoicePreview from "../../components/dashboard/invoice/InvoicePreview";

export default function Invoices() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],

    client: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    items: [
      {
        id: Date.now(),
        description: "",
        quantity: 1,
        price: 0,
      },
    ],

    discount: 0,
    tax: 0,
  });

  // =====================================================
  // GENERAL CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CLIENT CHANGE
  // =====================================================

  const handleClientChange = (e) => {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,

      client: {
        ...prev.client,
        [name]: value,
      },
    }));
  };

  // =====================================================
  // ADD ITEM
  // =====================================================

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,

      items: [
        ...prev.items,

        {
          id: Date.now(),
          description: "",
          quantity: 1,
          price: 0,
        },
      ],
    }));
  };

  // =====================================================
  // UPDATE ITEM
  // =====================================================

  const updateItem = (id, field, value) => {
    setInvoice((prev) => ({
      ...prev,

      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "price"
                  ? Number(value)
                  : value,
            }
          : item
      ),
    }));
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const removeItem = (id) => {
    setInvoice((prev) => ({
      ...prev,

      items:
        prev.items.length === 1
          ? prev.items
          : prev.items.filter((item) => item.id !== id),
    }));
  };

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const subtotal = useMemo(() => {
    return invoice.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }, [invoice.items]);

  const discountAmount = useMemo(() => {
    return Math.max(0, Number(invoice.discount) || 0);
  }, [invoice.discount]);

  const taxableAmount = Math.max(
    0,
    subtotal - discountAmount
  );

  const taxAmount = useMemo(() => {
    const taxRate = Number(invoice.tax) || 0;

    return taxableAmount * (taxRate / 100);
  }, [taxableAmount, invoice.tax]);

  const total = taxableAmount + taxAmount;


  // =====================================================
// DOWNLOAD PDF
// =====================================================

const handleDownloadPDF = async () => {
  const element = document.getElementById("invoice-preview");

  if (!element) {
    alert("Invoice preview not found.");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const margin = 10;

    const availableWidth = pageWidth - margin * 2;

    const imageHeight =
      (canvas.height * availableWidth) / canvas.width;

    let heightLeft = imageHeight;
    let position = margin;

    pdf.addImage(
      imageData,
      "PNG",
      margin,
      position,
      availableWidth,
      imageHeight
    );

    heightLeft -= pageHeight - margin * 2;

    while (heightLeft > 0) {
      position = heightLeft - imageHeight + margin;

      pdf.addPage();

      pdf.addImage(
        imageData,
        "PNG",
        margin,
        position,
        availableWidth,
        imageHeight
      );

      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save(
      `${invoice.invoiceNumber || "invoice"}.pdf`
    );
  } catch (error) {
    console.error("PDF generation error:", error);

    alert("Something went wrong while generating the PDF.");
  }
};
  // =====================================================
  // SAVE
  // =====================================================

const handleSave = async () => {
  try {
    const invoiceData = {
      ...invoice,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };

    console.log("SENDING INVOICE:", invoiceData);

   const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/invoices`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  }
);

   const result = await response.json();

console.log("BACKEND STATUS:", response.status);
console.log("BACKEND RESPONSE:", result);

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to save invoice"
      );
    }

    alert("Invoice saved successfully 🚀");
  } catch (error) {
    console.error("SAVE INVOICE ERROR:", error);

    alert(
      error.message || "Something went wrong while saving invoice."
    );
  }
};

  return (
    <div className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-500">
            KADECHO ADMIN
          </p>

          <h1 className="mt-1 font-bebas text-4xl uppercase tracking-wide text-white">
            Create Invoice
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Create and manage a professional invoice.
          </p>
        </div>


      </div>

     <div className="space-y-6">
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="space-y-6">
          {/* INVOICE INFORMATION */}

          <section className="rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.07] text-red-400">
                <FileText size={18} />
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Invoice Information
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Basic invoice details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Invoice Number"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
              />

              <Input
                label="Date"
                name="date"
                type="date"
                value={invoice.date}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* CLIENT */}

          <section className="rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-5">
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Client Information
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Information about the customer.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                name="name"
                value={invoice.client.name}
                onChange={handleClientChange}
                placeholder="Client name"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={invoice.client.email}
                onChange={handleClientChange}
                placeholder="client@email.com"
              />

              <Input
                label="Phone"
                name="phone"
                value={invoice.client.phone}
                onChange={handleClientChange}
                placeholder="+212 ..."
              />

              <Input
                label="Address"
                name="address"
                value={invoice.client.address}
                onChange={handleClientChange}
                placeholder="Client address"
              />
            </div>
          </section>

          {/* ITEMS */}

          <section className="rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Invoice Items
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Products or services included in this invoice.
                </p>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-2.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-zinc-400
                  transition-all
                  hover:border-red-500/30
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {invoice.items.map((item, index) => (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.015]
                    p-4
                  "
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                      Item {index + 1}
                    </span>

                    {invoice.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-600 transition hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_100px_140px_120px]">
                    <Input
                      label="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Product / service"
                    />

                    <Input
                      label="Qty"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Unit Price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          e.target.value
                        )
                      }
                    />

                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        Total
                      </label>

                      <div className="flex h-[46px] items-center rounded-xl border border-white/[0.06] bg-black/20 px-3 text-sm font-semibold text-white">
                        {(item.quantity * item.price).toFixed(2)} DH
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TAX / DISCOUNT */}

          <section className="rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-5">
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Adjustments
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Apply discount or tax to the invoice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Discount (DH)"
                name="discount"
                type="number"
                min="0"
                step="0.01"
                value={invoice.discount}
                onChange={handleChange}
              />

              <Input
                label="Tax (%)"
                name="tax"
                type="number"
                min="0"
                step="0.01"
                value={invoice.tax}
                onChange={handleChange}
              />
            </div>
          </section>
        </div>

{/* =================================================
    RIGHT — INVOICE PREVIEW
================================================= */}

<div className="xl:sticky xl:top-6 xl:self-start">
  <InvoicePreview
    invoice={invoice}
    subtotal={subtotal}
    discountAmount={discountAmount}
    taxAmount={taxAmount}
    total={total}
  />

<div className="mt-4 flex w-full justify-center">
  <div
    className="
      flex
      items-center
      gap-2

      rounded-2xl
      border
      border-white/[0.07]
      bg-[#0b0b0b]
      p-2

      shadow-[0_15px_40px_rgba(0,0,0,0.25)]

      backdrop-blur-xl
    "
  >
    {/* DOWNLOAD PDF */}
    <button
      type="button"
      onClick={handleDownloadPDF}
      className="
        group

        flex
        h-[44px]
        items-center
        justify-center
        gap-2

        rounded-xl

        border
        border-white/[0.06]

        bg-white/[0.025]

        px-4

        text-[10px]
        font-bold
        uppercase
        tracking-[0.16em]

        text-zinc-400

        transition-all
        duration-300

        hover:border-white/[0.12]
        hover:bg-white/[0.06]
        hover:text-white

        active:scale-[0.98]
      "
    >
      <Download
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />

      <span>Download PDF</span>
    </button>

    {/* SAVE INVOICE */}
    <button
      type="button"
      onClick={handleSave}
      className="
        group

        flex
        h-[44px]
        items-center
        justify-center
        gap-2

        rounded-xl

        border
        border-red-500/20

        bg-red-500/10

        px-5

        text-[10px]
        font-bold
        uppercase
        tracking-[0.16em]

        text-red-400

        shadow-[0_8px_25px_rgba(239,68,68,0.08)]

        transition-all
        duration-300

        hover:border-red-500/40
        hover:bg-red-500/15
        hover:text-red-300
        hover:shadow-[0_10px_30px_rgba(239,68,68,0.14)]

        active:scale-[0.98]
      "
    >
      <Save
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-105"
      />

      <span>Save Invoice</span>
    </button>
  </div>
</div>
</div>
      </div>
    </div>
  );
}

// =====================================================
// INPUT
// =====================================================

function Input({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  min,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-zinc-600">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className="
          h-[46px]
          w-full
          rounded-xl
          border
          border-white/[0.07]
          bg-white/[0.025]
          px-3
          text-xs
          text-white
          outline-none
          transition-all
          placeholder:text-zinc-700
          focus:border-red-500/40
          focus:bg-red-500/[0.025]
        "
      />
    </div>
  );
}

// =====================================================
// SUMMARY ROW
// =====================================================

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-zinc-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-zinc-200">
        {value}
      </span>
    </div>
  );
}