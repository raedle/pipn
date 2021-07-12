import { RESTDataSource } from "apollo-datasource-rest";

export default class NordVPNDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.nordvpn.com/v1/servers/";
  }

  // $ curl --silent "https://api.nordvpn.com/v1/servers/recommendations?filters\[country_id\]=81&limit=3" | jq --raw-output '.[].hostname'

  async getCountryIDs() {
    // curl --silent "https://api.nordvpn.com/v1/servers/countries" | jq --raw-output '.[] | [.id, .name] | @tsv'
    const response = await this.get("countries");
    return Array.isArray(response)
      ? response.map((country) => this.countryReducer(country))
      : [];
  }

  async getServerRecommendations() {
    const response = await this.get("recommendations");
    return Array.isArray(response)
      ? response.map((server) => this.serverReducer(server))
      : [];
  }

  countryReducer(country) {
    return {
      id: country.id,
      name: country.name,
      code: country.code,
      cities: country.cities.map((city) => ({
        id: city.id,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        dnsName: city.dns_name,
        hubScore: city.hub_score,
      })),
    };
  }

  serverReducer(server: any) {
    return {
      id: server.flight_number || 0,
      cursor: `${server.launch_date_unix}`,
      site: server.launch_site && server.launch_site.site_name,
      mission: {
        name: server.mission_name,
        missionPatchSmall: server.links.mission_patch_small,
        missionPatchLarge: server.links.mission_patch,
      },
      rocket: {
        id: server.rocket.rocket_id,
        name: server.rocket.rocket_name,
        type: server.rocket.rocket_type,
      },
    };
  }
}
