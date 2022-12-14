import type { Plugin } from "vite";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { green, blue, bold } from "picocolors";
import { getPackageSize } from "@pureadmin/utils";
dayjs.extend(duration);

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig: { command: string }) {
      config = resolvedConfig;
    },
    buildStart() {
      console.log(
        bold(
          green(
            `ðæ¬¢è¿ä½¿ç¨${blue(
              "[vue-admin-pro]"
            )}ï¼å¦ææ¨æè§ä¸éï¼è®°å¾ç¹å»åé¢é¾æ¥ç»ä¸ªstarå¦ð https://github.com/CHQ7/vue-admin-pro.git`
          )
        )
      );
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        getPackageSize({
          callback: (size: string) => {
            console.log(
              bold(
                green(
                  `ðæ­åæåå®æï¼æ»ç¨æ¶${dayjs
                    .duration(endTime.diff(startTime))
                    .format("mmåssç§")}ï¼æååçå¤§å°ä¸º${size}ï¼`
                )
              )
            );
          }
        });
      }
    }
  };
}
