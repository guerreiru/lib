import fs from "fs";
import path from "path";
import { saveTextToFile } from "./saveTextToFile.js";

/**
 * Extrai JSONs de um arquivo de log onde cada JSON aparece após a linha "JSON ENVIADO:".
 * @param filePath Caminho para o arquivo .txt
 * @returns Array de JSONs extraídos
 */
export const extractJsonsFromFile = (filePath: string): any[] => {
  const content = fs.readFileSync(path.resolve(filePath), "utf-8");

  const lines = content.split("\n");
  const results = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("JSON ENVIADO:")) {
      const jsonLine = lines[i + 1]; // Próxima linha contém o JSON

      try {
        const json = JSON.parse(jsonLine.trim());
        results.push(json);
      } catch (e: any) {
        console.error("❌ JSON inválido na linha", i + 2, ":", e.message);
      }
    }
  }

  const { name } = path.parse(filePath);
  const outputPath = `${name}.json`;
  saveTextToFile(JSON.stringify(results, null, 2), outputPath);

  return results;
};
