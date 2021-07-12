import { Field, Float, Int, ObjectType } from "type-graphql";
import * as moment from "moment";

@ObjectType()
export default class Status {
  @Field()
  status: string;

  @Field({ nullable: true })
  server?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  serverIP?: string;

  @Field({ nullable: true })
  technology?: string;

  @Field({ nullable: true })
  protocol?: string;

  @Field((type) => Float, { nullable: true })
  received?: number;

  @Field({ nullable: true })
  receivedUnit?: string;

  @Field((type) => Float, { nullable: true })
  sent?: number;

  @Field({ nullable: true })
  sentUnit?: string;

  @Field((type) => Int, { nullable: true })
  uptime?: number;

  static parse(rawStatus: string): Status {
    const regex =
      /\r-\r  \r\r-\r  \rStatus: (?<status>\w+)(?:\nCurrent server: (?<server>[a-z0-9\.]+)\nCountry: (?<country>[\w\s]+)\nCity: (?<city>[\w\s]+)\nServer IP: (?<serverIP>[\d\.]+)\nCurrent technology: (?<technology>\w+)\nCurrent protocol: (?<protocol>\w+)\nTransfer: (?<received>\d+\.\d+)\s(?<receivedUnit>\w+) received, (?<sent>\d+\.\d+)\s(?<sentUnit>\w+) sent\nUptime:\s(?<uptime1>\d+)\s(?<uptimeUnit1>\w+)(\s(?<uptime2>\d+)\s(?<uptimeUnit2>\w+))?(\s(?<uptime3>\d+)\s(?<uptimeUnit3>\w+))?)?/gm;
    const match = regex.exec(rawStatus);
    if (match !== null) {
      const { groups } = match;

      let uptime: string = null;
      if (
        groups.uptime1 != null &&
        groups.uptime2 != null &&
        groups.uptime3 != null
      ) {
        uptime = `${groups.uptime1}:${groups.uptime2}:${groups.uptime3}`;
      } else if (groups.uptime1 != null && groups.uptime2 != null) {
        uptime = `00:${groups.uptime1}:${groups.uptime2}`;
      } else if (groups.uptime1 != null) {
        uptime = `00:00:${groups.uptime1}`;
      }

      return {
        status: groups.status,
        server: groups.server,
        country: groups.country,
        city: groups.city,
        serverIP: groups.serverIP,
        technology: groups.technology,
        protocol: groups.protocol,
        received: groups.received ? parseFloat(groups.received) : null,
        receivedUnit: groups.receivedUnit,
        sent: groups.sent ? parseFloat(groups.sent) : null,
        sentUnit: groups.sentUnit,
        uptime: moment.duration(uptime).asMilliseconds(),
      };
    }
    return {
      status: "unknown",
    };
  }
}
