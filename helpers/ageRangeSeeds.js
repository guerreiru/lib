import { hasValue } from "./hasValue";

export const ageRangeSeeds = (ageRanges) => {
  if (ageRanges.length && ageRanges.length > 0) {
    const values = ageRanges.map(
      ({
        DataCriacao: createdAt,
        UsuarioCriacao: creationUser,
        DataAlteracao: updatedAt,
        UsuarioAlteracao: updateUser,
        DataExclusao: deletedAt,
        UsuarioExclusao: deletionUser,
        FaixaIdade: ageRange,
        Sexo: gender,
        TamanhoLote: lotSize,
        Creep: creep,
      }) => {
        return `(${hasValue(createdAt)}, ${hasValue(creationUser)}, ${hasValue(
          updatedAt
        )}, ${hasValue(updateUser)}, ${hasValue(deletedAt)}, ${hasValue(
          deletionUser
        )}, ${hasValue(ageRange)}, ${hasValue(gender)}, ${hasValue(
          lotSize
        )}, ${hasValue(creep)})`;
      }
    );

    const query = `INSERT INTO herdDb_fernando.ageRange(createdAt, creationUser, updatedAt, updateUser, deletedAt, deletionUser, ageRange, gender, lotSize, creep) VALUES ${values.toString()};`;

    return query;
  }
};
