import fs from "fs";

export function previewEmail(templateHtml: string) {
  // Créer un fichier HTML temporaire
  fs.writeFileSync("email-preview.html", templateHtml);

  // Sur macOS, ouvre directement dans le navigateur
  if (process.platform === "darwin") {
    require("child_process").exec("open email-preview.html");
  }
}
