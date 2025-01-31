import { Resend } from "resend";
import dotenv from "dotenv";
import { Buying, Customer, Item } from "@/types/items";
import { orderHtml } from "@/utils/mail/order-html";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async ({
  items,
  user,
}: {
  items: (Buying & { items: Item })[];
  user: {
    email: string;
    name: string;
    phone: string;
    address: string;
    zipcode: string;
    city: string;
  };
}) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,

      subject: "Confirmation de votre commande",

      text: "Merci pour votre commande",
      html: orderHtml({
        user: {
          name: user.name,
          email: user.email,
        },
        items: items.map((item) => ({
          ...item.items,
          price: item.items.price,
          discount: Number(item.items.discount),
          quantity: Number(item.items.stock), // Todo : update to quantity
          size: item.size,
        })),
      }),
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
