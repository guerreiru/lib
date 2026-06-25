/**
 * Módulo com funções utilitárias para busca em dados JSONL
 * Pode ser importado e usado em outros scripts
 */

/**
 * Acessa propriedades aninhadas usando notação de ponto
 * @param {Object} obj - Objeto a ser pesquisado
 * @param {string} pathStr - Caminho da propriedade (ex: "body.herdCollects.movements")
 * @returns {*} O valor encontrado ou undefined
 */
export function getNestedProperty(
  obj: { [key: string]: any },
  pathStr: string,
): any {
  const parts = pathStr.split(".");
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Verifica se um objeto atende aos critérios de filtro
 * @param {Object} obj - Objeto a ser verificado
 * @param {string[]} filters - Array de filtros (ex: ["number=200", "farmId=1703"])
 * @returns {boolean} true se o objeto atende a todos os filtros
 */
export function matchesFilters(
  obj: { [key: string]: any },
  filters: string[],
): boolean {
  if (!filters || filters.length === 0) return true;

  for (const filter of filters) {
    const operatorMatch = filter.match(/^(.+?)(=|<|>|<=|>=|!=)(.+)$/);
    if (!operatorMatch) continue;

    const [, property, operator, value] = operatorMatch;
    const objValue = obj[property.trim()];
    if (objValue === undefined) return false;

    const numValue = isNaN(Number(value)) ? value.trim() : Number(value);
    const numObjValue = isNaN(Number(objValue)) ? objValue : Number(objValue);
    let matches = false;

    switch (operator) {
      case "=":
        matches = numObjValue === numValue || objValue === value.trim();
        break;
      case "<":
        matches = numObjValue < numValue;
        break;
      case ">":
        matches = numObjValue > numValue;
        break;
      case "<=":
        matches = numObjValue <= numValue;
        break;
      case ">=":
        matches = numObjValue >= numValue;
        break;
      case "!=":
        matches = numObjValue !== numValue && objValue !== value.trim();
        break;
    }

    if (!matches) return false;
  }
  return true;
}

/**
 * Busca dados em uma linha JSON e retorna objetos que correspondem aos filtros
 * @param {Object} jsonLine - Objeto JSON de uma linha
 * @param {string} path - Caminho até o array (ex: "body.herdCollects.movements")
 * @param {string[]} filters - Array de filtros
 * @returns {Object[]} Array de objetos encontrados
 */
export function searchInLine(
  jsonLine: { [key: string]: any },
  path: string,
  filters: string[],
): { [key: string]: any }[] {
  const results: { [key: string]: any }[] = [];
  const targetArray = getNestedProperty(jsonLine, path);

  if (Array.isArray(targetArray)) {
    for (const item of targetArray) {
      if (matchesFilters(item, filters)) {
        results.push(item);
      }
    }
  }

  return results;
}

/**
 * Processa um arquivo JSONL e busca resultados
 * @param {string} filePath - Caminho do arquivo JSONL
 * @param {string} path - Caminho até o array
 * @param {string[]} filters - Array de filtros
 * @returns {Promise<{results: Object[], stats: Object}>}
 */
export async function searchInJsonlFile(
  filePath: string,
  path: string,
  filters: string[],
): Promise<{
  results: { [key: string]: any }[];
  stats: { [key: string]: number };
}> {
  const fs = await import("fs");
  const readline = await import("readline");

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let results: { [key: string]: any }[] = [];
  let stats: { [key: string]: number } = {
    totalLines: 0,
    linesProcessed: 0,
    objectsFound: 0,
    errors: 0,
  };

  for await (const line of rl) {
    stats.totalLines++;
    try {
      const jsonData = JSON.parse(line);
      const lineResults = searchInLine(jsonData, path, filters);
      results.push(...lineResults);
      stats.objectsFound += lineResults.length;
      stats.linesProcessed++;
    } catch (error) {
      stats.errors++;
    }
  }

  return { results, stats };
}

/**
 * Formata resultados para exibição no console
 * @param {Object[]} results - Array de resultados
 * @param {Object} options - Opções de formatação
 * @returns {string} String formatada
 */
export function formatResults(
  results: { [key: string]: any }[],
  options: { title?: string; columns?: string[]; limit?: number } = {},
): string {
  const {
    title = "Resultados da Busca",
    columns = null,
    limit = null,
  } = options;

  let output = `\n${"=".repeat(80)}\n`;
  output += `${title}\n`;
  output += `${"=".repeat(80)}\n`;

  if (results.length === 0) {
    output += "Nenhum resultado encontrado.\n";
    return output;
  }

  const displayResults = limit ? results.slice(0, limit) : results;

  if (columns && Array.isArray(columns)) {
    // Exibir em coluna
    output += `Total: ${results.length} resultado(s)\n\n`;
    displayResults.forEach((item, idx) => {
      output += `${idx + 1}. `;
      const values = columns
        .map((col) => {
          const value = getNestedProperty(item, col);
          return `${col}: ${JSON.stringify(value)}`;
        })
        .join(", ");
      output += values + "\n";
    });
  } else {
    // Exibir em JSON
    output += `Total: ${results.length} resultado(s)\n\n`;
    output += JSON.stringify(displayResults, null, 2);
  }

  output += `\n${"=".repeat(80)}\n`;
  return output;
}

/**
 * Conta ocorrências de um valor em uma propriedade
 * @param {Object[]} results - Array de resultados
 * @param {string} field - Campo a contar
 * @returns {Object} Objeto com contagem por valor
 */
export function countBy(
  results: { [key: string]: any }[],
  field: string,
): { [key: string]: number } {
  const counts: { [key: string]: number } = {};

  results.forEach((item) => {
    const value = item[field];
    counts[value] = (counts[value] || 0) + 1;
  });

  return counts;
}

/**
 * Extrai apenas campos específicos dos resultados
 * @param {Object[]} results - Array de resultados
 * @param {string[]} fields - Campos a extrair
 * @returns {Object[]} Array com apenas os campos especificados
 */
export function selectFields(
  results: { [key: string]: any }[],
  fields: string[],
): { [key: string]: any }[] {
  return results.map((item) => {
    const selected: { [key: string]: any } = {};
    fields.forEach((field) => {
      selected[field] = item[field];
    });
    return selected;
  });
}

/**
 * Ordena resultados por um campo
 * @param {Object[]} results - Array de resultados
 * @param {string} field - Campo para ordenar
 * @param {string} order - 'asc' para ascendente, 'desc' para descendente
 * @returns {Object[]} Array ordenado
 */
export function sortBy(
  results: { [key: string]: any }[],
  field: string,
  order: "asc" | "desc" = "asc",
): { [key: string]: any }[] {
  return [...results].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (order === "asc") {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });
}

/**
 * Sumariza dados numéricos
 * @param {Object[]} results - Array de resultados
 * @param {string} field - Campo numérico
 * @returns {Object} Objeto com estatísticas
 */
export function summarize(
  results: { [key: string]: any }[],
  field: string,
): { [key: string]: number } {
  const values = results
    .map((item) => Number(item[field]))
    .filter((v) => !isNaN(v));

  if (values.length === 0) {
    return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    count: values.length,
    sum,
    avg: Math.round(avg * 100) / 100,
    min,
    max,
  };
}
