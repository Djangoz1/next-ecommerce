import dotenv from "dotenv";
import { buttonHtml, layoutMailHtml, titleHtml } from "@/utils/mail/html";
import { Item } from "@/types/items";

dotenv.config();

const divDetail = ({ title, value }: { title: string; value: string }) => {
  return `
    <li style="
        display: flex;
        width: 100%;
        justify-content: space-between!important;
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
            margin-left: auto;
        ">${value}</p>
    </li>
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
     <li style="
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
    </li>
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
     gap: 20px!important;
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
            width: 100%;
            height:150px;
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

       
        <li style="
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
              <span style="font-size: 18px; text-decoration: line-through; ">
                ${item.price} €
              </span>
              <span style="font-size: 18px; ">${
                Number(item.price) - (Number(item.price) * item.discount) / 100
              } €</span>
            </div>`
              : `
            <p style="font-size: 15px; font-weight: 600;">${Number(
              item.price
            )} €</p>
            `
          }
        </li>
      </div>
    </div>
    `;
};

export const orderHtml = ({
  items,
  user,
}: {
  items: Item[];
  user: { name: string; email: string };
}) => {
  // Votre template d'email

  const price = items.reduce(
    (acc, item) => {
      const discount = item.discount
        ? (Number(item.price) * item.discount) / 100
        : 0;

      acc.discount += discount;
      acc.price += Number(item.price) - discount;
      acc.brut += Number(item.price);
      return acc;
    },
    { discount: 0, price: 0, brut: 0 }
  );
  const htmlTemplate = layoutMailHtml(`
   <section>
   
        <div style="display: flex; flex-direction:row!important;  text-align: left; border-bottom: 1px solid #333; gap: 20px; padding-top: 20px; padding-bottom: 20px; ">
        
            <div>
                <img src="${
                  process.env.APP_URL || "http://localhost:3000"
                }/icons/bubble-chat.png" alt="Message ORMÉS" style="width: 40px; height:fit-content!important;"/>
            </div>
            <div style="">
                
              ${titleHtml("Merci de votre achat !")}
            
                <p style="">
                <br>
                Bonjour ${user.name},
                <br>
                    <br>
                    Votre commande a bien été pris en compte. <b>Nous vous remercions pour votre confiance.</b> 
                    <br>
                    <br>
                    Vous recevrez très rapidement la suite du suivi de votre commande directement par mail et pourrez également la retrouver sur votre espace client.
                <p>
            </div>
            
        
        </div>
       <ul style=" margin-bottom: 20px; width: 100%; gap: 5px; padding: 0px; list-style-type: none;">
${[
  divStatus({
    img: "order.png",
    value: true,
    title: "Commande confirmée !",
  }),
  divStatus({
    img: "shipment.png",
    value: false,
    title: "Commande expédiée !",
  }),
  divStatus({
    img: "delivery.png",
    value: false,
    title: "Commande livrée !",
  }),
]
  .map((el) => el)
  .join("")}
          

        </ul>
      
       
        ${buttonHtml("Suivi de ma commande")}
       <ul style=" padding:30px 0px; width: 100%; gap: 10px;">
       ${[
         divDetail({ title: "Numéro de commande", value: "1234567890" }),
         divDetail({
           title: "Frais de livraison",
           value: price.price > 250 ? "0€" : "25€",
         }),
         divDetail({ title: "Réduction", value: price.discount + "€" }),
         divDetail({
           title: "Réduction sur la livraison",
           value: price.price >= 250 ? "0€" : "25€",
         }),
         divDetail({
           title: "Nombre total de produits",
           value: price.brut + "€",
         }),
         divDetail({
           title:
             "<span style='font-weight: 600; font-size: 15px;'> Total (TVA COMPRISE)</span>",
           value: `<span style='font-weight: 600; font-size: 20px;'>${
             price.price >= 250 ? price.price + 25 : price.price
           }</span>`,
         }),
       ]
         .map((el) => el)
         .join("")}
           
            
       </ul>
       <ul style=" padding:0px; width: 100%;">
            ${items
              .map((item) =>
                itemOrder({
                  item: {
                    ...item,
                    price: Number(item.price),
                    quantity: 1,
                    size: "M",
                  },
                })
              )
              .join("")}
        </ul>
</section>       

  `);

  return htmlTemplate;
};
