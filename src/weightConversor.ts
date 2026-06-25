export const weightConversor = (
  weights: { operationDate: string; weightType: string; weight: number }[],
): { [key: string]: any } => {
  const _weights: { [key: string]: any } = {};

  weights.forEach((weight) => {
    _weights.DataPesagem = weight.operationDate;
    _weights.DataOperacao = weight.operationDate;

    if (weight.weightType === "VISUAL") {
      _weights.PesoVisual = weight.weight;
      _weights.DataPesagemVisual = weight.operationDate;
    }
    if (weight.weightType === "PESADO") {
      _weights.PesoMedido = weight.weight;
    }
    if (weight.weightType === "PROJETADO") {
      _weights.PesoProjetado = weight.weight;
    }
    if (weight.weightType === "OBJETIVO") {
      _weights.PesoObjetivo = weight.weight;
    }
  });

  return _weights;
};
