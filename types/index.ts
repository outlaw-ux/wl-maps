export type Filters = {
  readonly lot?: string;
  readonly block?: string;
  readonly section?: string;
};

export interface IParcelsError {
  readonly invalidAddress: boolean;
  readonly incompleteAddress: boolean;
}
