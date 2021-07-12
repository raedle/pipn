import { commandSync, SyncOptions } from "execa";

export async function executeCommand(
  cmd: string,
  options?: SyncOptions<string>
): Promise<string> {
  return new Promise((resolve) => {
    const result = commandSync(cmd, options);
    console.log({
      result: result.stdout,
    });
    resolve(result.stdout);
  });
}
