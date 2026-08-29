import Invoice from "../models/Invoice.js";

// =====================================================
// CREATE INVOICE
// POST /api/invoices
// =====================================================

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.error("CREATE INVOICE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create invoice",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL INVOICES
// GET /api/invoices
// =====================================================

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error("GET INVOICES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get invoices",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE INVOICE
// DELETE /api/invoices/:id
// =====================================================

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    await Invoice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("DELETE INVOICE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete invoice",
      error: error.message,
    });
  }
};