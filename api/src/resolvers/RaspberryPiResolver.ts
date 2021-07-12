import { Mutation, Resolver } from "type-graphql";
import { executeCommand } from "../utils/CommandUtils";

@Resolver()
export default class RaspberryPiResolver {
  @Mutation((returns) => Boolean)
  async reboot(): Promise<Boolean> {
    await executeCommand("sudo reboot");
    return true;
  }

  @Mutation((returns) => Boolean)
  async shutdown(): Promise<boolean> {
    await executeCommand("sudo shutdown -h now");
    return true;
  }

  @Mutation((returns) => Boolean)
  async turnOnDisplay(): Promise<Boolean> {
    await executeCommand(
      `sudo sh -c \'echo \"0\" > /sys/class/backlight/rpi_backlight/bl_power\'`,
      { shell: true }
    );
    return true;
  }

  @Mutation((returns) => Boolean)
  async turnOffDisplay(): Promise<Boolean> {
    await executeCommand(
      `sudo sh -c \'echo \"1\" > /sys/class/backlight/rpi_backlight/bl_power\'`,
      { shell: true }
    );
    return true;
  }
}
