import { mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Cria múltiplas pastas a partir de um diretório base de forma recursiva.
 *
 * A função cria todas as pastas especificadas no array, incluindo subpastas
 * aninhadas. Se as pastas já existirem, não ocorre erro. O caminho base é
 * calculado a partir do diretório pai do arquivo atual.
 *
 * @async
 * @param {string} baseDir - Nome do diretório base onde as pastas serão criadas.
 *                           O caminho é relativo ao diretório pai de helpers/ (ex: "src", "projeto").
 * @param {string[]} folders - Array com os caminhos das pastas a serem criadas,
 *                             relativos ao baseDir. Suporta caminhos aninhados (ex: "components/ui").
 * @returns {Promise<void>} Retorna uma Promise que resolve quando todas as pastas forem criadas.
 * @throws {Error} Lança erro se houver falha na criação das pastas (ex: permissões insuficientes).
 *
 * @example
 * // Cria estrutura básica de projeto
 * await createFolders('meu-projeto', ['src', 'src/components', 'src/utils']);
 *
 * @example
 * // Cria estrutura de módulos aninhados
 * await createFolders('backend', ['modules/auth/controllers', 'modules/users/models']);
 */
export async function createFolders(
  baseDir: string,
  folders: string[],
): Promise<void> {
  try {
    const basePath = path.join(__dirname, "../", baseDir);

    for (const folder of folders) {
      const fullPath = path.join(basePath, folder);
      await mkdir(fullPath, { recursive: true });
      console.log(`✅ Criado: ${fullPath}`);
    }

    console.log("\n🎉 Estrutura criada com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao criar as pastas:", err);
  }
}
