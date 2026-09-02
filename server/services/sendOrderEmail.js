import axios from "axios";

export const sendOrderEmail = async (order) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "KADECHO",
          email: "ghcvh3989@gmail.com",
        },

        to: [
          {
            email: order.customer.email,
            name: order.customer.name,
          },
        ],

        subject: "Confirmation de votre commande | KADECHO",

        htmlContent: `
          <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">

            <div style="max-width:700px;margin:30px auto;background:#ffffff;border-radius:18px;overflow:hidden">

              <div style="background:#000000;padding:40px;text-align:center">

                <h1 style="color:#ffffff;margin:0">
                  KADECHO
                </h1>

                <p style="color:#d1d5db;margin-top:15px">
                  Confirmation de votre commande
                </p>

              </div>

              <div style="padding:40px">

                <div
                  style="
                    background:#fef3c7;
                    color:#92400e;
                    padding:12px;
                    border-radius:10px;
                    text-align:center;
                    font-weight:bold;
                    margin-bottom:25px;
                  "
                >
                  Référence :
                  #${order._id.toString().slice(-6).toUpperCase()}
                </div>

                <div
                  style="
                    background:#ecfdf5;
                    color:#065f46;
                    padding:15px;
                    border-radius:10px;
                    text-align:center;
                    font-weight:bold;
                    margin-bottom:30px;
                  "
                >
                  ✓ Votre commande a été reçue avec succès
                </div>

                <h2 style="color:#111827">
                  Bonjour ${order.customer.name},
                </h2>

                <p style="color:#4b5563;line-height:1.8">
                  Merci pour votre confiance.
                  Nous avons bien reçu votre commande et nous vous contacterons
                  prochainement pour confirmer votre commande.
                </p>

                <div
                  style="
                    height:2px;
                    background:#facc15;
                    margin:30px 0;
                  "
                ></div>

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:25px;
                  "
                >

                  <h3 style="margin-top:0;color:#111827">
                    Détails de votre commande
                  </h3>

                  ${order.items
                    .map(
                      (item) => `
                        <div
                          style="
                            padding:15px 0;
                            border-bottom:1px solid #e5e7eb;
                          "
                        >

                          <strong style="color:#111827">
                            ${item.name}
                          </strong>

                          <p style="margin:6px 0;color:#6b7280">
                            Quantité : ${item.quantity}
                          </p>

                          <p style="margin:0;color:#111827">
                            ${item.price} DH
                          </p>

                        </div>
                      `
                    )
                    .join("")}

                  <div style="margin-top:25px;text-align:right">

                    <p style="color:#4b5563">
                      Sous-total :
                      <strong>${order.subtotal} DH</strong>
                    </p>

                    <p style="color:#4b5563">
                      Livraison :
                      <strong>${order.shipping} DH</strong>
                    </p>

                    <p style="font-size:20px;color:#111827">
                      Total :
                      <strong>${order.total} DH</strong>
                    </p>

                  </div>

                </div>

                <div style="text-align:center;margin-top:35px">

                  <p style="color:#4b5563;line-height:1.7">
                    Notre équipe vous contactera prochainement
                    pour confirmer les détails de votre commande.
                  </p>

                </div>

              </div>

              <div
                style="
                  background:#111827;
                  color:#9ca3af;
                  text-align:center;
                  padding:30px;
                "
              >

                <strong style="color:#facc15">
                  KADECHO
                </strong>

                <br><br>

                Merci pour votre confiance.

                <br><br>

                © 2026 KADECHO. Tous droits réservés.

              </div>

            </div>

          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("✅ KADECHO EMAIL SENT");
    console.log("📧 Brevo response:", response.data);

    return true;
  } catch (error) {
    console.error("❌ KADECHO EMAIL ERROR");
    console.error(
      error.response?.data || error.message
    );

    return false;
  }
};