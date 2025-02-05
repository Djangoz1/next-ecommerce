export const layoutMailHtml = (children: string) => {
  return `
  <body style="margin:0px; padding:0px; width:100%;">
      <style type="text/css">
        p {
          margin: 0px;
          font-size: 12px;
          color: #666;
          height:fit-content;
          font-weight: 200;
        }
        .button-link {
          border: 1px solid #333;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          color: #333;
          width: 100%;
          font-size: 10px;
          text-align: center !important;
        }


        .button {
          background-color: #333; 
          color: #fff; 
          width: 100%; 
          text-align: center; 
          text-transform: uppercase;
          padding: 10px 20px; 
          text-decoration: none;
          
          border-radius: 5px;
          border: 1px solid #333; 
        }

        .button-container {
          display: flex;
          flex-direction: row;
          gap: 10px;
          width: 100%;
          margin:10px;
        }
        @media screen and (max-width: 600px) {
          .button-container {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
        }
      </style>
       <div style="
            background-color: #FFFEFF!;
            text-align: center;
            padding: 20px;
            flex-direction: column!important;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
            display: flex;
            min-height: 100vh;
            overflow: scroll;
        ">
        <h1 style="
            width: 100%;
            padding-bottom: 20px;
            color: #333;
            font-size: 44px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 200;
            border-bottom: 1px solid #333;
            text-transform: uppercase;
            letter-spacing: 1px;
        ">
            ORMÉS
        </h1> 
        
        
        ${children}

        <footer style="
            width: 100%;
            padding: 20px 0px;
            color: #333;
        ">
          <div style="
            
            
            
            text-align: center;
            width: 100%;
          ">
        
          ${titleHtml("Besoin de quelque chose ?")}  

          <p style="
            margin: 10px 0px;
            font-size: 14px;
            font-weight: 200;
          ">
          Notre service clientèle se tient à votre disposition pour répondre à toutes vos questions.
          </p>

          <div
          class="button-container"
          style="            
            gap: 10px;
            width:100%;
            margin:10px;
          ">
            <a
            target="_blank"
            class="button-link"
            
            href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/faq/return-refund">Annuler la commande</a>
            <a
            target="_blank"
            class="button-link"
            href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/faq/return-refund">Comment effectuer un retour ?</a>
            <a 
            target="_blank"
            class="button-link"
            href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/faq/return-refund">Modification de l'adresse</a>
            </div>
            </div>
            <a
            target="_blank"
            class="button"
            style="width:100%;"
            href="${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/contact">Contactez-nous</a>
        <footer/>
      </div>
    
    </body>
      `;
};

export const titleHtml = (children: string) => {
  return `
    <h4 style="
      color: #333;
      height:fit-content;
      font-size: 16px;
      padding: 0px;
      font-family: 'Poppins', sans-serif;
    ">${children}</h4>
  `;
};

export const buttonHtml = (children: string) => {
  return `
    <button class="button" >${children}</button>
  `;
};
