import dotenv from "dotenv";
import { layoutMailHtml, titleHtml } from "@/utils/mail/html";

dotenv.config();

export const newsletterHtml = ({
  coupon,
  user,
}: {
  coupon: { id: string; discount: number; type: "amount" | "percent" };

  user: { name: string; email: string };
}) => {
  // Votre template d'email

  const htmlTemplate = layoutMailHtml(`
   <section>
   
        <div style="display: flex; flex-direction:row!important;  text-align: left;  gap: 20px; padding-top: 20px; padding-bottom: 20px; ">
        
            <div style="">
                
              ${titleHtml("Nouveau code de réduction")}
            
                <p style="">
                <br>
                Bonjour ${user.name},
                <br>
                    <br>
                    
                    Nous avons le plaisir de vous offrir un nouveau code de réduction de 
                    <b>${
                      coupon.type === "percent"
                        ? `${coupon.discount}%`
                        : `${coupon.discount}€`
                    } de réduction sur votre première commande</b>.
                    
                <p>
            </div>
            <div style="width: 100%; height:fit-content; padding: 20px; background-color: #f0f0f0; display: flex; justify-content: center; items-content: center; gap: 10px;">
            <span style="font-size: 18px; font-weight: 300; color: #333;">Code de réduction : </span>
            <span style="font-size: 18px; font-weight: 300; color: #333;">${
              coupon.id
            }</span>
            </div>
            
        
            </div>
            <a class="button-link" target="_blank" href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/shop/dress" style="margin-top:50px!important; width:100%;" >
           
            Voir la boutique
            </a>
     
       
</section>       

  `);

  return htmlTemplate;
};

export const newNewsletterHtml = ({
  coupon,
  user,
}: {
  coupon: {
    id: string;
    discount: number;
  };
  user: { name: string; email: string };
}) => {
  // Votre template d'email

  const htmlTemplate = layoutMailHtml(`
   <section>
   
        <div style="display: flex; flex-direction:row!important;  text-align: left;  gap: 20px; padding-top: 20px; padding-bottom: 20px; ">
        
            <div style="">
                
              ${titleHtml("Merci de votre inscription !")}
            
                <p style="">
                <br>
                Bonjour ${user.name},
                <br>
                    <br>
                    Votre inscription a bien été pris en compte. 
                    Pour vous remercier de votre inscription, nous vous offrons <b>${
                      coupon.discount
                    }% de réduction sur votre première commande</b>.
                    
                <p>
            </div>
            <div style="width: 100%; height:fit-content; padding: 20px; background-color: #f0f0f0; display: flex; justify-content: center; items-content: center; gap: 10px;">
            <span style="font-size: 18px; font-weight: 300; color: #333;">Code de réduction : </span>
            <span style="font-size: 18px; font-weight: 300; color: #333;">${
              coupon.id
            }</span>
            </div>
            
        
            </div>
            <a class="button-link" target="_blank" href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/shop/dress" style="margin-top:50px!important; width:100%;" >
           
            Voir la boutique
            </a>
     
       
</section>       

  `);

  return htmlTemplate;
};
