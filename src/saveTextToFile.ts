import fs from "fs";
import path from "path";

/**
 * Salva um conteúdo de texto em um arquivo no sistema de arquivos.
 *
 * @param {string} content - O conteúdo de texto que será salvo no arquivo.
 * @param {string} [fileName="output.txt"] - O nome do arquivo ou caminho completo onde o conteúdo será salvo.
 *                                           Caso não seja fornecido, o padrão será "output.txt" na raiz do projeto.
 *
 * @throws {Error} Lança um erro caso a operação de escrita no arquivo falhe.
 *
 * @example
 * // Salva o conteúdo "Olá, mundo!" no arquivo "mensagem.txt"
 * saveTextToFile("Olá, mundo!", "mensagem.txt");
 *
 * @example
 * // Salva o conteúdo "Teste" no arquivo padrão "output.txt"
 * saveTextToFile("Teste");
 */
export const saveTextToFile = (
  content: string,
  fileName = "output.txt",
): void => {
  const pathFile = path.resolve(process.cwd(), fileName);

  try {
    // Salva o arquivo no caminho especificado
    fs.writeFileSync(pathFile, content, "utf8");

    console.log(`Arquivo ${fileName} salvo com sucesso.`);
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
  }
};
