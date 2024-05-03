const { dateDiff } = require("./dateDiff");
const { isValidDate } = require("./isValidDate");

const date = {
  Data: "16/11/2021 17:58",
  DataISO: "2021-11-16T20:58:11.000Z",
  UsuarioCriacao: "joel.pizzatto",
  IdOperacaoLote: 284615,
  TipoOperacao: "Criação",
  OrigemNomeCategoriaAnimal: "",
  DestinoNomeCategoriaAnimal: "FE 201 a 250 Kg",
  OrigemNomePasto: "",
  DestinoNomePasto: "D-16",
  Quantidade: 74,
  DestinoQuantidade: 74,
  DataCriacao: "2021-11-22T13:55:55.000Z",
};

const diff = dateDiff("2021-11-22T13:55:55.000Z", "2021-11-16T20:58:11.000Z");

console.log(diff);
