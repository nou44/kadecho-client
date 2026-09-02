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
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation de commande - KADECHO</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#eeeeee;
    font-family:Arial,Helvetica,sans-serif;
    color:#111111;
  "
>

  <!-- MAIN WRAPPER -->
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#eeeeee;padding:35px 15px;"
  >
    <tr>
      <td align="center">

        <!-- EMAIL CONTAINER -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:680px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
          "
        >

          <!-- ================= HEADER ================= -->

          <tr>
            <td
              style="
                background:#050505;
                padding:42px 30px 36px;
                text-align:center;
              "
            >

              <!-- LOGO -->
              <div style="margin-bottom:22px;">

                <img
                  src="/kadecho-logo-128.webp"
                  alt="KADECHO"
                  width="170"
                  style="
                    display:block;
                    width:170px;
                    max-width:80%;
                    height:auto;
                    margin:0 auto;
                    border:0;
                  "
                />

              </div>

              <!-- BRAND -->
              <div
                style="
                  font-size:28px;
                  font-weight:800;
                  letter-spacing:5px;
                  color:#ffffff;
                  margin-bottom:10px;
                "
              >
                KADECHO
              </div>

              <!-- RED LINE -->
              <div
                style="
                  width:55px;
                  height:3px;
                  background:#e50914;
                  margin:0 auto 18px;
                "
              ></div>

              <div
                style="
                  color:#bdbdbd;
                  font-size:14px;
                  letter-spacing:1px;
                "
              >
                CONFIRMATION DE VOTRE COMMANDE
              </div>

            </td>
          </tr>


          <!-- ================= CONTENT ================= -->

          <tr>
            <td style="padding:42px 38px;">

              <!-- SUCCESS -->
              <div
                style="
                  background:#fff1f1;
                  border:1px solid #ffd0d0;
                  border-left:4px solid #e50914;
                  padding:17px 18px;
                  border-radius:10px;
                  margin-bottom:30px;
                "
              >

                <div
                  style="
                    color:#b00000;
                    font-size:15px;
                    font-weight:700;
                  "
                >
                  ✓ COMMANDE REÇUE AVEC SUCCÈS
                </div>

                <div
                  style="
                    color:#666666;
                    font-size:13px;
                    margin-top:6px;
                  "
                >
                  Merci pour votre confiance.
                </div>

              </div>


              <!-- GREETING -->

              <h2
                style="
                  margin:0 0 12px;
                  color:#111111;
                  font-size:24px;
                  font-weight:700;
                "
              >
                Bonjour ${order.customer.name},
              </h2>

              <p
                style="
                  margin:0;
                  color:#666666;
                  font-size:15px;
                  line-height:1.8;
                "
              >
                Nous avons bien reçu votre commande.
                Notre équipe vous contactera prochainement afin de
                confirmer les détails de votre commande.
              </p>


              <!-- ================= REFERENCE ================= -->

              <div
                style="
                  margin-top:30px;
                  background:#080808;
                  border-radius:12px;
                  padding:20px 22px;
                "
              >

                <div
                  style="
                    color:#999999;
                    font-size:11px;
                    letter-spacing:1.5px;
                    text-transform:uppercase;
                    margin-bottom:7px;
                  "
                >
                  Référence de commande
                </div>

                <div
                  style="
                    color:#ffffff;
                    font-size:22px;
                    font-weight:700;
                    letter-spacing:2px;
                  "
                >
                  #${order._id.toString().slice(-6).toUpperCase()}
                </div>

              </div>


              <!-- ================= RED DIVIDER ================= -->

              <div
                style="
                  height:1px;
                  background:#eeeeee;
                  margin:35px 0;
                "
              ></div>


              <!-- ================= ORDER DETAILS ================= -->

              <h3
                style="
                  margin:0 0 18px;
                  color:#111111;
                  font-size:18px;
                  font-weight:700;
                "
              >
                Détails de votre commande
              </h3>


              <!-- PRODUCTS -->

              <div
                style="
                  border:1px solid #eeeeee;
                  border-radius:12px;
                  overflow:hidden;
                "
              >

                ${order.items
                  .map(
                    (item) => `
                      <div
                        style="
                          padding:20px;
                          border-bottom:1px solid #eeeeee;
                        "
                      >

                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                        >
                          <tr>

                            <td
                              style="
                                vertical-align:top;
                                padding-right:15px;
                              "
                            >

                              <div
                                style="
                                  color:#111111;
                                  font-size:15px;
                                  font-weight:700;
                                  margin-bottom:7px;
                                "
                              >
                                ${item.name}
                              </div>

                              <div
                                style="
                                  color:#777777;
                                  font-size:13px;
                                "
                              >
                                Quantité : ${item.quantity}
                              </div>

                            </td>

                            <td
                              align="right"
                              style="
                                vertical-align:top;
                                white-space:nowrap;
                              "
                            >

                              <div
                                style="
                                  color:#111111;
                                  font-size:16px;
                                  font-weight:700;
                                "
                              >
                                ${item.price} DH
                              </div>

                            </td>

                          </tr>
                        </table>

                      </div>
                    `
                  )
                  .join("")}


                <!-- TOTALS -->

                <div
                  style="
                    padding:22px;
                    background:#fafafa;
                  "
                >

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >

                    <tr>
                      <td
                        style="
                          padding:6px 0;
                          color:#666666;
                          font-size:14px;
                        "
                      >
                        Sous-total
                      </td>

                      <td
                        align="right"
                        style="
                          padding:6px 0;
                          color:#222222;
                          font-size:14px;
                          font-weight:600;
                        "
                      >
                        ${order.subtotal} DH
                      </td>
                    </tr>


                    <tr>
                      <td
                        style="
                          padding:6px 0;
                          color:#666666;
                          font-size:14px;
                        "
                      >
                        Livraison
                      </td>

                      <td
                        align="right"
                        style="
                          padding:6px 0;
                          color:#222222;
                          font-size:14px;
                          font-weight:600;
                        "
                      >
                        ${order.shipping} DH
                      </td>
                    </tr>


                    <tr>
                      <td
                        colspan="2"
                        style="
                          padding-top:15px;
                          border-top:1px solid #dddddd;
                        "
                      ></td>
                    </tr>


                    <tr>
                      <td
                        style="
                          color:#111111;
                          font-size:18px;
                          font-weight:800;
                        "
                      >
                        TOTAL
                      </td>

                      <td
                        align="right"
                        style="
                          color:#e50914;
                          font-size:22px;
                          font-weight:800;
                        "
                      >
                        ${order.total} DH
                      </td>
                    </tr>

                  </table>

                </div>

              </div>


              <!-- ================= MESSAGE ================= -->

              <div
                style="
                  margin-top:32px;
                  padding:22px;
                  background:#080808;
                  border-radius:12px;
                  text-align:center;
                "
              >

                <div
                  style="
                    color:#ffffff;
                    font-size:15px;
                    font-weight:700;
                    margin-bottom:8px;
                  "
                >
                  Votre commande est entre de bonnes mains.
                </div>

                <div
                  style="
                    color:#999999;
                    font-size:13px;
                    line-height:1.7;
                  "
                >
                  Notre équipe vous contactera prochainement
                  pour confirmer votre commande.
                </div>

              </div>

            </td>
          </tr>


          <!-- ================= FOOTER ================= -->

          <tr>
            <td
              style="
                background:#050505;
                padding:35px 25px;
                text-align:center;
              "
            >

              <div
                style="
                  color:#ffffff;
                  font-size:20px;
                  font-weight:800;
                  letter-spacing:4px;
                "
              >
                KADECHO
              </div>

              <div
                style="
                  width:40px;
                  height:2px;
                  background:#e50914;
                  margin:14px auto 18px;
                "
              ></div>

              <div
                style="
                  color:#888888;
                  font-size:12px;
                  line-height:1.8;
                "
              >
                Merci pour votre confiance.
                <br />
                © 2026 KADECHO. Tous droits réservés.
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
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