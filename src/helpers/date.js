export const { dateDiff } = require("./dateDiff");

/**
 * Classe para manipulação de datas.
 */
class DateManipulator {
  /**
   * Obtém a data e hora atual.
   * @returns {Date} A data e hora atual.
   */
  static currentDate() {
    return new Date();
  }

  /**
   * Adiciona uma quantidade específica de horas a uma data.
   * @param {number} amountOfHours - A quantidade de horas a serem adicionadas.
   * @param {Date} [date=currentDate()] - A data à qual adicionar as horas.
   * @returns {Date} Uma nova instância de data após a adição de horas.
   * @throws {Error} Se a quantidade de horas não for um número.
   */
  static addHours(amountOfHours, date = this.currentDate()) {
    if (typeof amountOfHours !== "number") {
      throw new Error("A quantidade de horas deve ser um número.");
    }

    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + amountOfHours);
    return newDate;
  }

  /**
   * Subtrai uma quantidade específica de horas de uma data.
   * @param {number} amountOfHours - A quantidade de horas a serem subtraídas.
   * @param {Date} [date=currentDate()] - A data à qual subtrair as horas.
   * @returns {Date} Uma nova instância de data após a subtração de horas.
   * @throws {Error} Se a quantidade de horas não for um número.
   */
  static subtractHours(amountOfHours, date = this.currentDate()) {
    if (typeof amountOfHours !== "number") {
      throw new Error("A quantidade de horas deve ser um número.");
    }

    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - amountOfHours);
    return newDate;
  }

  /**
   * Obtém o início do dia para uma determinada data.
   * @param {Date} [date=currentDate()] - A data para a qual obter o início do dia.
   * @returns {Date} Uma nova instância de data representando o início do dia.
   */
  static getStartOfDay(date = this.currentDate()) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  /**
   * Obtém o final do dia para uma determinada data.
   * @param {Date} [date=currentDate()] - A data para a qual obter o final do dia.
   * @returns {Date} Uma nova instância de data representando o final do dia.
   */
  static getEndOfDay(date = this.currentDate()) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  }

  /**
   * Calculates the difference between two dates and returns the selected fields.
   *
   * @param {Date|string} startDate - The start date. Can be a Date object or a string in ISO 8601 format.
   * @param {Date|string} endDate - The end date. Can be a Date object or a string in ISO 8601 format.
   * @returns {Object} - An object containing the selected fields and their values.
   * @throws {Error} - If startDate or endDate are not valid date objects or strings in ISO 8601 format.
   */
  static diff(startDate, endDate) {
    return dateDiff(startDate, endDate);
  }
}

export { DateManipulator };
