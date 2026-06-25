export type AgeRangeHerdService = {
  createdAt: Date;
  creationUser: string;
  updatedAt: Date | null;
  updateUser: string | null;
  deletedAt: Date | null;
  deletionUser: string | null;
  ageRange: string;
  gender: string;
  lotSize: number;
  creep: string;
};

export type AgeRange = {
  DataCriacao: string | null;
  UsuarioCriacao: string | null;
  DataAlteracao: string | null;
  UsuarioAlteracao: string | null;
  DataExclusao: string | null;
  UsuarioExclusao: string | null;
  FaixaIdade: string;
  Sexo: string | null;
  TamanhoLote: number | null;
  Creep: number | null;
};
