// @flow strict

import type { CommandType } from "./commands.js";

import { COMMANDS } from "./commands.js";

const redirect: (string) => Promise<void> = async function (url: string) {
  await window.location.replace(url);
};

const bunnylol: (string) => Promise<boolean> = async function (
  currCmd: string
) {
  const arr = currCmd.split(/[ +]/g);

  if (arr.length > 0) {
    let prefix: string = arr[0].endsWith(".")
      ? arr[0].substring(0, arr[0].length - 1).toLowerCase()
      : arr[0].toLowerCase();

    if(prefix.startsWith("go%2f") && prefix.substring(5) in COMMANDS){
      prefix = prefix.substring(5)
      searchParam += 5
    }

    if(prefix.startsWith("go/") && prefix.substring(3) in COMMANDS){
      prefix = prefix.substring(3)
      searchParam += 3
    }

    if (prefix in COMMANDS) {
      // $FlowFixMe - this is actually correct since the prefix is a key.
      const command: CommandType = COMMANDS[prefix];
      if (command.searchurl && arr.length !== 1) {
        await redirect(
          `${command.searchurl}${encodeURIComponent(
            arr.slice(1).join(" ")
          )}`
        );
        return true;
      } else {
        await redirect(command.url);
        return true;
      }
    }
  }
  return false;
};

const currCmd: string =
  new URL(window.location.href).searchParams.get("search") ?? "help";

switch (currCmd) {
  default:
    bunnylol(currCmd)
      .then((done: boolean) => {
        if (!done && COMMANDS.DEFAULT.searchurl) {
          redirect(
            `${COMMANDS.DEFAULT.searchurl}${encodeURIComponent(currCmd)}`
          );
        }
      })
      .catch((reject: string) => {
        console.log(reject);
      });
    break;
}
