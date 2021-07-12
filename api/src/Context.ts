import type NordVPNDataSource from "./NordVPNDataSource";

export interface Context {
  dataSources: {
    nordVPNDataSource: NordVPNDataSource;
  };
}