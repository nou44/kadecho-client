
import express from "express";

import contactController from "../controllers/contactController.js";


const router = express.Router();


// =====================================================
// CREATE
// POST /api/contact
// =====================================================

router.post(
  "/",
  contactController.createContactMessage
);


// =====================================================
// GET ALL
// GET /api/contact
// =====================================================

router.get(
  "/",
  contactController.getContactMessages
);


// =====================================================
// DELETE
// DELETE /api/contact/:id
// =====================================================

router.delete(
  "/:id",
  contactController.deleteContactMessage
);


export default router;

