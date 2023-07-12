const herdByFarmIdDataExtractor = (herdData) => {
  const livestocks = herdData.pastures
    .map((herdData) => {
      return herdData.livestocks;
    })
    .reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

  const lotes = livestocks.map((livestock) => {
    const active = livestock.endDate ? true : true;
    const deleted = livestock.deletedAt ? true : false;

    return {
      IdLote: livestock.id,
      IdCategoriaAnimal: livestock.animalCategoryId,
      IdPasto: livestock.pastureId,
      IdModulo: null,
      IdRetiro: null,
      IdFazenda: herdData.farmId,
      Ativo: active,
      Quantidade: livestock.quantity,
      ...weightConversor(livestock.weights),
      Excluido: deleted,
      IdObjetivo: livestock.goal ? livestock.goal.id : null,
      Objetivo: livestock.goal
        ? {
            IdObjetivo: livestock.goal.id,
            Nome: livestock.goal.name,
            IdFazenda: herdData.farmId,
            Excluido: livestock.goal.deletedAt ? true : false,
          }
        : null,
    };
  });

  return lotes;
};

module.exports = { herdByFarmIdDataExtractor };
