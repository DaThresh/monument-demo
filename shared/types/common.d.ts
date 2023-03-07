export type Nullable<Type> = Type | null;

export type ParanoidData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
};

export type DateString = string;
