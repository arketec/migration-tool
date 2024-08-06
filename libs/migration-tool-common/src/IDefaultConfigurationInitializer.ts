export interface IDefaultConfigurationInitializer {
  defaultConfig<T = any>(): Promise<T>;
}
