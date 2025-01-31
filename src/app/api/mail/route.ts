import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { buttonHtml, layoutMailHtml, titleHtml } from "@/utils/mail/html";

dotenv.config();

const divDetail = ({ title, value }: { title: string; value: string }) => {
  return `
    <div style="
        display: flex;
        width: 100%;
        justify-content: space-between;
        justify-items: center;
        text-align: left;
        height:fit-content;
        
        padding: 0px 0px;
    ">
        <p style="
            font-size: 12px;
            color: #666;
            height:fit-content;
            font-weight: 200;
        "
        >${title}</p>

        <p style="
            font-size: 12px;
            font-weight: 600;
            height:fit-content;
            margin: auto 0;
        ">${value}</p>
    </div>
    `;
};

const divStatus = ({
  img,
  value,
  title,
}: {
  img: string;
  value: boolean;
  title: string;
}) => {
  return `
     <div style="
        display: flex;
        width: 100%;
        gap: 20px;
        justify-items: center;
        text-align: left;
        padding: 20px;
        ${value ? "opacity: 1;" : "opacity: 0.5;"}
     ">    
        <div style="height:fit-content; margin:auto 0;">
            <img
                src="${
                  process.env.APP_URL || "http://localhost:3000"
                }/icons/${img}"
                alt="${title}" 
                style="width: 40px; height:fit-content;"
            />
        </div>
        ${titleHtml(title)}
        ${
          value
            ? `
            <div style="height:fit-content; margin:auto 0; margin-left: auto;">
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-check'><polyline points='20 6 9 17 4 12'/></svg>
            </div>
            `
            : ""
        }
    </div>
    `;
};

const itemOrder = ({
  item,
}: {
  item: {
    main_image: string;
    name: string;
    abstract_description: string;
    type: string;
    size: string;
    quantity: number;
    price: number;
    discount: number;
  };
}) => {
  return `
     <div
     style="
     display: flex;
     width: 100%;
     gap: 20px;
     text-align: left;
     border-bottom: 1px dashed #333;
     padding: 10px 0px;
     "
     >
      <div >
        <img
            style="
                width: 100px;
                height:150px;
            "
            src="${item.main_image}"
            alt="${item.name}"
        />
      </div>
      <div 
        style="
            flex-direction: column;
            display:flex; 
            
            
            width: 100%;
            height:150px;
            justify-content: space-between;
        "
      >
        ${titleHtml(item.name)}
        <p style="
          text-transform: uppercase;
        ">
          <span style="font-weight: 200; font-size: 15px;">
            ${item.abstract_description}
          </span>
          <br/>
          <br/>
          ${
            {
              painting: "Peinture",
              dress: "Vêtement",
              miniature: "Miniature",
            }[item.type]
          }
          <br/>
          Taille : ${item.size}
        </p>

       
        <div style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: auto;
            font-weight: 600;
            height:fit-content;
            gap: 5px;
            align-items: center;
        ">
          <p style="font-size: 18px;  font-weight: 600; color: #333;">x${
            item.quantity
          }</p>
          ${
            item.discount
              ? `
            <div style="display: flex; height:fit-content; items-center; gap:10px; ">
              <p style="font-size: 18px; text-decoration: line-through; ">
                ${item.price} €
              </p>
              <p style="font-size: 18px; ">${
                Number(item.price) - (Number(item.price) * item.discount) / 100
              } €</p>
            </div>`
              : `
            <p style="font-size: 15px; font-weight: 600;">${Number(
              item.price
            )} €</p>
            `
          }
        </div>
      </div>
    </div>
    `;
};

export async function GET() {
  // Votre template d'email
  const htmlTemplate = layoutMailHtml(`
   
        <div style="display: flex;  text-align: left; border-bottom: 1px solid #333; gap: 20px; padding-top: 20px; padding-bottom: 20px; ">
        
            <div>
                <img src="${
                  process.env.APP_URL || "http://localhost:3000"
                }/icons/bubble-chat.png" alt="Message ORMÉS" style="width: 40px; height:fit-content"/>
            </div>
            <div style="display: flex; flex-direction: column;  ">
                ${titleHtml("Merci de votre achat !")}
                <p style="">
                <br>
                Bonjour Julien,
                <br>
                    <br>
                    Votre commande a bien été pris en compte. <b>Nous vous remercions pour votre confiance.</b> 
                    <br>
                    <br>
                    Vous recevrez très rapidement la suite du suivi de votre commande directement par mail et pourrez également la retrouver sur votre espace client.
                <p>
            </div>
            
        
        </div>
       

        ${divStatus({
          img: "order.png",
          value: true,
          title: "Commande confirmée !",
        })}
        ${divStatus({
          img: "shipment.png",
          value: false,
          title: "Commande expédiée !",
        })}
        ${divStatus({
          img: "delivery.png",
          value: false,
          title: "Commande livrée !",
        })}
      
       
        ${buttonHtml("Suivi de ma commande")}
       <div style="display: flex; padding:30px 0px; width: 100%; flex-direction: column; gap: 10px;">
       
            ${divDetail({ title: "Numéro de commande", value: "1234567890" })}
            ${divDetail({ title: "Frais de livraison", value: "25€" })}
            ${divDetail({ title: "Réduction", value: "-26.95€" })}
            ${divDetail({ title: "Réduction sur la livraison", value: "-0€" })}
            ${divDetail({
              title: "Nombre total de produits",
              value: "174.94 €",
            })}
            ${divDetail({
              title:
                "<span style='font-weight: 600; font-size: 15px;'> Total (TVA COMPRISE)</span>",
              value:
                "<span style='font-weight: 600; font-size: 20px;'>152.10€</span>",
            })}
            
       </div>
       <div style="display: flex; padding:0px; width: 100%; flex-direction: column; gap: 10px;">
       
       ${itemOrder({
         item: {
           main_image: "https://picsum.photos/200/300",
           name: "Peinture",
           abstract_description: "Peinture abstraite",
           type: "painting",
           size: "M",
           quantity: 1,
           price: 100,
           discount: 10,
         },
       })}
        ${itemOrder({
          item: {
            main_image: "https://picsum.photos/200/300",
            name: "Peinture",
            abstract_description: "Peinture abstraite",
            type: "painting",
            size: "M",
            quantity: 1,
            price: 100,
            discount: 10,
          },
        })}
        </div>
       

  `);

  return new NextResponse(htmlTemplate, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
