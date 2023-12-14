// Função para inicializar os dados do pasto com valores padrão
const inicializarDadosPasto = (coletasAltura) => {
  const idPasto = coletasAltura[0].IdPasto;
  const idForragem = coletasAltura[0].IdForragem;
  let crescimento = null;
  let diasDescanso = null;

  return { crescimento, diasDescanso, idPasto, idForragem };
};

// Função para inicializar os dados de coleta com valores padrão
const inicializarDadosColeta = () => {
  let ultimaColetaEntradaAfericao = null;
  let ultimaColetaSaida = null;
  let indiceColeta = 0;
  return { indiceColeta, ultimaColetaEntradaAfericao, ultimaColetaSaida };
};

// Função para verificar se a coleta é de entrada ou aferição
const seColetaEntradaOuAfericao = (coletasAltura, indiceColeta) => {
  return (
    coletasAltura[indiceColeta].NomeTipoColetaAltura === "Entrada" ||
    coletasAltura[indiceColeta].NomeTipoColetaAltura === "Afericao"
  );
};

// Função para verificar se a coleta é de saída
const seColetaSaida = (coletasAltura, indiceColeta) => {
  return coletasAltura[indiceColeta].NomeTipoColetaAltura === "Saida";
};

// Função para obter a última coleta de entrada/aferição e saída
const obterUltimaColetaDeEntradaAfericaoESaida = (coletasAltura) => {
  let { indiceColeta, ultimaColetaEntradaAfericao, ultimaColetaSaida } =
    inicializarDadosColeta();

  // Procura pela última coleta de entrada/aferição
  for (indiceColeta; indiceColeta < coletasAltura.length; indiceColeta++) {
    if (seColetaEntradaOuAfericao(coletasAltura, indiceColeta)) {
      ultimaColetaEntradaAfericao = coletasAltura[indiceColeta];
      indiceColeta++;
      break;
    }
  }

  // Procura pela última coleta de saída
  for (indiceColeta; indiceColeta < coletasAltura.length; indiceColeta++) {
    if (seColetaSaida(coletasAltura, indiceColeta)) {
      ultimaColetaSaida = coletasAltura[indiceColeta];
      break;
    }
  }

  return { ultimaColetaEntradaAfericao, ultimaColetaSaida };
};

const calcMedia = (valores) =>
  valores.reduce((acc, val) => acc + val.Altura, 0) / valores.length;

// Função para obter o crescimento dos pastos
// para obter o crescimento efetivo os dados são provenientes das coletas de altura
const obterCrescimentoPastos = (coletasAltura) => {
  var { crescimento, diasDescanso, idPasto, idForragem } =
    inicializarDadosPasto(coletasAltura);
  let { ultimaColetaEntradaAfericao, ultimaColetaSaida } =
    obterUltimaColetaDeEntradaAfericaoESaida(coletasAltura);

  // Calcula o crescimento e os dias de descanso se houver coletas de entrada/aferição e saída
  if (ultimaColetaEntradaAfericao && ultimaColetaSaida) {
    crescimento = obterCrescimento(
      crescimento,
      ultimaColetaEntradaAfericao,
      ultimaColetaSaida
    );
    diasDescanso = calculaDiferencaDatasEmDias(
      ultimaColetaEntradaAfericao.DataColeta,
      ultimaColetaSaida.DataColeta
    );
  }

  const mediaAlturaEntrada = calcMedia(
    ultimaColetaEntradaAfericao.MedidaAltura
  );
  const mediaAlturaSaida = calcMedia(ultimaColetaSaida.MedidaAltura);

  const crescimentoDiarioOcorrido =
    (mediaAlturaEntrada - mediaAlturaSaida) / diasDescanso;

  return {
    IdPasto: idPasto,
    IdForragem: idForragem,
    Descanso: diasDescanso,
    Crescimento: crescimento,
    CrescimentoDiarioOcorrido: crescimentoDiarioOcorrido,
  };
};

// Função para calcular o crescimento com base nas medições de altura
const obterCrescimento = (
  crescimento,
  ultimaColetaEntradaAfericao,
  ultimaColetaSaida
) => {
  const mediaAlturaEntrada =
    ultimaColetaEntradaAfericao.MedidaAltura.reduce(
      (total, medidaAltura) => total + medidaAltura.Altura,
      0
    ) / ultimaColetaEntradaAfericao.MedidaAltura.length;
  const mediaAlturaSaida =
    ultimaColetaSaida.MedidaAltura.reduce(
      (total, medidaAltura) => total + medidaAltura.Altura,
      0
    ) / ultimaColetaSaida.MedidaAltura.length;
  const valorCrescimento = mediaAlturaEntrada - mediaAlturaSaida;
  return valorCrescimento;
};

// Função para calcular a diferença de dias entre duas datas
const calculaDiferencaDatasEmDias = (dataRecente, dataAntiga) => {
  let recente = new Date(dataRecente);
  let antiga = new Date(dataAntiga);
  let diferencaTempo = Math.abs(recente.getTime() - antiga.getTime());
  return Math.round(diferencaTempo / (1000 * 3600 * 24));
};

// Função para agrupar as coletas por pasto
coletasAgrupadasPorIdPasto = (coletas) => {
  const coletasAgrupadas = {};

  coletas.forEach((coleta) => {
    const idPasto = coleta.IdPasto;

    if (!coletasAgrupadas[idPasto]) {
      coletasAgrupadas[idPasto] = [];
    }

    coletasAgrupadas[idPasto].push(coleta);
  });

  return coletasAgrupadas;
};

// Função para ordenar as coletas por data decrescente
const obterColetasOrdenadas = (coletasAlturaPastos) => {
  return coletasAlturaPastos.sort((a, b) => {
    const dataA = new Date(a.DataColeta);
    const dataB = new Date(b.DataColeta);

    if (dataA < dataB) {
      return 1;
    } else if (dataA > dataB) {
      return -1;
    } else {
      return 0;
    }
  });
};

const calcCrescimento = (alturaEntrada, alturaSaida, dias) => {
  return (alturaEntrada - alturaSaida) / dias;
};

// Função para obter o relacionamento entre pastos e módulos
const obterRelacionamentoPastosModulos = (pastos) =>
  pastos.reduce((relacionamento, { IdPasto, IdModulo }) => {
    relacionamento[IdPasto] = Boolean(IdModulo);
    return relacionamento;
  }, {});

const calculaCrescimentoEsperado = (
  crescimentoDoPasto,
  dadoPastosCicloForragem
) => {
  return (
    crescimentoDoPasto.Descanso *
    dadoPastosCicloForragem.TaxaCrescimentoEsperado
  );
};

// Função para obter os dados de altura de entrada e saída do ciclo de forragem
const obterAlturaEntradaSaidaCicloForragem = (
  cicloForragem,
  coletaAlturaPasto,
  idForragem
) => {
  let periodo = cicloForragem.PeriodoCicloForragemFazenda.find(
    ({ MesInicio, MesFim, DiaInicio, DiaFim }) => {
      const dataColeta = new Date(coletaAlturaPasto.DataColeta);
      dataColeta.setHours(0, 0, 0, 0);
      if (MesInicio > MesFim || (MesInicio === MesFim && DiaInicio > DiaFim)) {
        const dataInicio1 = new Date(
          dataColeta.getFullYear() - 1,
          MesInicio - 1,
          DiaInicio
        );
        const dataFim1 = new Date(dataColeta.getFullYear(), MesFim - 1, DiaFim);
        const dataInicio2 = new Date(
          dataColeta.getFullYear(),
          MesInicio - 1,
          DiaInicio
        );
        const dataFim2 = new Date(
          dataColeta.getFullYear() + 1,
          MesFim - 1,
          DiaFim
        );
        return (
          (dataInicio1 <= dataColeta && dataColeta <= dataFim1) ||
          (dataInicio2 <= dataColeta && dataColeta <= dataFim2)
        );
      } else {
        const dataInicio = new Date(
          dataColeta.getFullYear(),
          MesInicio - 1,
          DiaInicio
        );
        const dataFim = new Date(dataColeta.getFullYear(), MesFim - 1, DiaFim);
        return dataInicio <= dataColeta && dataColeta <= dataFim;
      }
    }
  );
  const idCicloForragemFazenda = periodo
    ? periodo.IdCicloForragemFazenda
    : null;

  const descansoPrevisto = periodo ? periodo.QuantidadeDiasDescanso : null;
  const taxaCrescimentoEsperado = periodo
    ? calcCrescimento(
        periodo.AlturaEntrada,
        periodo.AlturaSaida,
        periodo.QuantidadeDiasDescanso
      )
    : null;

  return {
    IdPasto: coletaAlturaPasto.IdPasto,
    IdForragem: idForragem,
    IdCicloForragemFazenda: idCicloForragemFazenda,
    AlturaEntrada: periodo ? periodo.AlturaEntrada : null,
    AlturaSaida: periodo ? periodo.AlturaSaida : null,
    DescansoPrevisto: descansoPrevisto,
    TaxaCrescimentoEsperado: taxaCrescimentoEsperado,
  };
};

// Função para obter os dados dos pastos com base nas coletas de altura e ciclos de forragem
const obterDadosPastosCicloForragem = (
  pastos,
  coletasAlturaPastos,
  ciclosForragens
) => {
  const obterDadosPasto = (pasto, coletaAlturaPasto, cicloForragem) => {
    if (coletaAlturaPasto && coletaAlturaPasto.MedidaAltura && cicloForragem) {
      return obterAlturaEntradaSaidaCicloForragem(
        cicloForragem,
        coletaAlturaPasto,
        pasto.IdForragem
      );
    } else {
      return {
        IdPasto: pasto.IdPasto,
        IdForragem: pasto.IdForragem,
        IdCicloForragemFazenda: null,
        AlturaEntrada: null,
        AlturaSaida: null,
        DescansoPrevisto: null,
        TaxaCrescimentoEsperado: null,
      };
    }
  };

  return pastos.map((pasto) => {
    const coletaAlturaPasto = coletasAlturaPastos.find(
      (c) => c.IdPasto === pasto.IdPasto
    );
    const cicloForragem = ciclosForragens.find(
      (c) => c.IdForragem === pasto.IdForragem
    );

    return obterDadosPasto(pasto, coletaAlturaPasto, cicloForragem);
  });
};

// Função para obter o crescimento do pasto com base nos dados das coletas
const obterCrescimentoPasto = (
  crescimentoPastosPorColeta,
  dadoPastosCicloForragem
) => {
  return crescimentoPastosPorColeta.find(
    (coleta) => coleta.IdPasto === dadoPastosCicloForragem.IdPasto
  );
};

// Função para verificar se ocorre crescimento no pasto com módulo
const seOcorreCrescimentoPasto = (
  crescimentoDoPasto,
  pastoPossuiOuNaoModulo
) => {
  return (
    crescimentoDoPasto &&
    crescimentoDoPasto.Crescimento !== "undefined" &&
    crescimentoDoPasto.Crescimento !== null &&
    pastoPossuiOuNaoModulo[crescimentoDoPasto.IdPasto]
  );
};

// Função para obter o crescimento de referência com base no crescimento esperado e uma referência
const obterCrescimentoReferencia = (crescimentoEsperado, referencia) => {
  return (crescimentoEsperado * referencia.Valor.ValorPercentual) / 100;
};

// Calcula a cor de referência com base no crescimento esperado e efetivo.
const calculaCorReferencia = (
  referenciasFarol,
  crescimentoEsperado,
  crescimentoEfetivo,
  percentual
) => {
  let corReferencia = null;

  referenciasFarol
    .sort((a, b) => a.Valor.ValorPercentual - b.Valor.ValorPercentual)
    .forEach((referencia) => {
      const crescimentoReferencia = obterCrescimentoReferencia(
        crescimentoEsperado,
        referencia
      );

      const diferenca = percentual - referencia.Valor.ValorPercentual;

      const porcentagemAMais =
        (diferenca / referencia.Valor.ValorPercentual) * 100;

      if (crescimentoEfetivo >= crescimentoReferencia) {
        corReferencia = referencia.Cor;
      }
    });

  return corReferencia;
};

// Calcular o "farol de crescimento" para forragens.
const obterFarolCrescimentoForragem = (
  farol,
  pastos,
  coletasAlturaPastos,
  ciclosForragens
) => {
  const pastoPossuiOuNaoModulo = obterRelacionamentoPastosModulos(pastos);
  const ciclosForragemPastos = obterDadosPastosCicloForragem(
    pastos,
    coletasAlturaPastos,
    ciclosForragens
  );

  const coletasOrdenadas = obterColetasOrdenadas(coletasAlturaPastos);
  const coletasPorIdPasto = coletasAgrupadasPorIdPasto(coletasOrdenadas);

  const crescimentoPastosPorColeta = Object.values(coletasPorIdPasto).map(
    (coletasAltura) => {
      return obterCrescimentoPastos(coletasAltura);
    }
  );

  farol.Forragens = ciclosForragens;
  farol.Pasto = ciclosForragemPastos.map((dadoPastosCicloForragem) => {
    const crescimentoDoPasto = obterCrescimentoPasto(
      crescimentoPastosPorColeta,
      dadoPastosCicloForragem
    );

    const percentual =
      (crescimentoDoPasto.CrescimentoDiarioOcorrido /
        dadoPastosCicloForragem.TaxaCrescimentoEsperado) *
      100;

    let corReferencia = null;
    if (seOcorreCrescimentoPasto(crescimentoDoPasto, pastoPossuiOuNaoModulo)) {
      let crescimentoEsperado = calculaCrescimentoEsperado(
        crescimentoDoPasto,
        dadoPastosCicloForragem
      );

      corReferencia = calculaCorReferencia(
        farol.Referencia,
        crescimentoEsperado,
        crescimentoDoPasto.Crescimento,
        percentual
      );

      return {
        IdPasto: dadoPastosCicloForragem.IdPasto,
        IdForragem: dadoPastosCicloForragem.IdForragem,
        Valor: {
          CrescimentoEfetivo: crescimentoDoPasto.Crescimento,
          CrescimentoDiarioOcorrido:
            crescimentoDoPasto.CrescimentoDiarioOcorrido,
          DiasDeDescansoEfetivo: crescimentoDoPasto.Descanso,
          PercentualDeCrescimentoOcorrido: percentual,
        },
        Cor: corReferencia,
      };
    } else {
      return {
        IdPasto: dadoPastosCicloForragem.IdPasto,
        IdForragem: dadoPastosCicloForragem.IdForragem,
        Valor: null,
        Cor: corReferencia,
      };
    }
  });

  return farol;
};

module.exports = { obterFarolCrescimentoForragem };
