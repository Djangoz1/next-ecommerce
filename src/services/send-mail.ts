import { Resend } from "resend";
import dotenv from "dotenv";
import { Buying, Customer, Item } from "@/types/items";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async ({
  items,
  customers,
}: {
  items: (Buying & { items: Item })[];
  customers: Customer;
}) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: customers.email,
      subject: "Confirmation de votre commande",
      text: "Merci pour votre commande",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">

          <h1 style="color: #333; font-size: 44px; margin-bottom: 20px; text-align: center; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">ORMÉS</h1>
          <h4 style="color: #333; font-size: 24px; margin-bottom: 20px;">Confirmation de commande</h4>
          
          <p style="color: #666; font-size: 16px;">
            Merci ${customers.name} pour votre commande !
          </p>

          <div style="margin: 30px 0; border-top: 1px solid #eee; padding-top: 20px;">
            ${items
              .map(
                (item) => `
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                <div style="display: flex; align-items: center;">
                <img src="${item.items.main_image}" alt="${item.items.name}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 20px;">
                <div>
                <h3 style="color: #333; margin: 0 0 10px 0;">${item.items.name}</h3>
                  <p style="color: #666; margin: 0;">Taille: <strong style="color: #000;">${item.size}</strong></p>
                  <p style="color: #666; margin: 0;">Prix: <strong style="color: #000;">${item.items.price}€</strong></p>
                </div>
                </div>
                </div>
              `
              )
              .join("")}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Adresse de livraison:<br>
              ${customers.name}<br>
              ${customers.address}<br>
              ${customers.zipcode} ${customers.city}
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email", error);
    throw error;
  }
};

export const sendNewsletterEmail = async (email: string) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Inscription à la newsletter",
      text: "Merci pour votre inscription à la newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">

          <h1 style="color: #333; font-size: 44px; margin-bottom: 20px; text-align: center; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">ORMÉS</h1>
          <h4 style="color: #333; font-size: 24px; margin-bottom: 20px;">Inscription à la newsletter</h4>
          
          <p style="color: #666; font-size: 16px;">
            Merci pour votre inscription à la newsletter !
          </p>

          <div style="margin: 30px 0; border-top: 1px solid #eee; padding-top: 20px;">
         <p style="color: #666; font-size: 16px;">
            Vous recevrez des informations exclusives sur le lancement des capsules, des communication personnalisée et les dernières actualités de la Maison.
          </p>
          
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email", error);
    throw error;
  }
};

export const sendDeleteNewsletterEmail = async (email: string) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Suppression de votre abonnement newsletter",
      text: "Vous avez été supprimé de la newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">

          <h1 style="color: #333; font-size: 44px; margin-bottom: 20px; text-align: center; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">ORMÉS</h1>
          <h4 style="color: #333; font-size: 24px; margin-bottom: 20px;">Vous avez été supprimé de la newsletter</h4>
          
          <p style="color: #666; font-size: 16px;">
          Nous espérons vous revoir bientôt sur notre site !
          </p>

          <div style="margin: 30px 0; border-top: 1px solid #eee; padding-top: 20px;">
         <p style="color: #666; font-size: 16px;">
          Vous pouvez vous réabonner à tout moment sur notre site.
          </p>
          
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email", error);
    throw error;
  }
};
