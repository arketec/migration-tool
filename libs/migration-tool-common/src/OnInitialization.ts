export interface OnInitialization {
  preInit?: () => Promise<void>;
  postInit?: () => Promise<void>;
  onInit: () => Promise<void>;
}
