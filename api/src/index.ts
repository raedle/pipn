// DO NOT MOVE THIS PAST THE SERVER
import "reflect-metadata";

import { start } from "./Server";

(async () => {
  try {
    start();
  } catch (err) {
    console.error(err);
  }
})();
