'use strict';const COMMANDS = {
  fb: {
    name: "Facebook",
    url: "https://facebook.com/",
    searchurl: "https://www.facebook.com/search/top/?q="
  },
  m: {
    name: "Messenger Desktop App",
    url: "messenger://"
  },
  mw: {
    name: "Messenger Web",
    url: "https://www.messenger.com/"
  },
  wa: {
    name: "WhatsApp Desktop App",
    url: "whatsapp://"
  },
  waw: {
    name: "WhatsApp Web",
    url: "https://web.whatsapp.com/"
  },
  gm: {
    name: "Gmail",
    url: "https://mail.google.com/mail/u/0",
    searchurl: "https://mail.google.com/mail/u/"
  },
  gd: {
    name: "Google Drive",
    url: "https://drive.google.com/drive/u/0",
    searchurl: "https://drive.google.com/drive/u/"
  },
  sis: {
    name: "UVA SIS",
    url: "https://sisuva.admin.virginia.edu/psc/ihprd/UVSS/SA/s/WEBLIB_HCX_GN.H_SPRINGBOARD.FieldFormula.IScript_Main"
  },
  col: {
    name: "UVA Collab",
    url: "https://collab.its.virginia.edu/portal"
  },
  yt: {
    name: "YouTube",
    url: "https://youtube.com/",
    searchurl: "https://www.youtube.com/results?search_query="
  },
  tv: {
    name: "YouTube TV",
    url: "https://tv.youtube.com/"
  },
  gh: {
    name: "GitHub",
    url: "https://github.com/",
    searchurl: "https://www.github.com/search?q="
  },
  r: {
    name: "Reddit",
    url: "https://reddit.com/",
    searchurl: "https://www.reddit.com/search?q="
  },
  l: {
    name: "Linkedin",
    url: "https://linkedin.com/"
  },
  ig: {
    name: "Instagram",
    url: "https://instagram.com/",
    searchurl: "https://instagram.com/"
  },
  tw: {
    name: "Twitter",
    url: "https://twitter.com/",
    searchurl: "https://twitter.com/search?q="
  },
  me: {
    name: "Rithik.me - Personal Website",
    url: "https://rithik.me/me"
  },
  g: {
    name: "Google",
    url: "https://google.com/",
    searchurl: "https://www.google.com/search?q="
  },
  wp: {
    name: "Washington Post",
    url: "https://www.washingtonpost.com/regional/"
  },
  wsj: {
    name: "Wall Street Journal",
    url: "https://www.wsj.com/"
  },
  cnn: {
    name: "CNN",
    url: "https://www.cnn.com/"
  },
  tr: {
    name: "HooHacks Trello Board",
    url: "https://trello.com/b/GjKhtVPK/hoohacks"
  },
  n: {
    name: "Netflix",
    url: "https://netflix.com/",
    searchurl: "https://www.netflix.com/search?q="
  },
  h: {
    name: "Hulu",
    url: "https://hulu.com/"
  },
  pv: {
    name: "Amazon Prime Video",
    url: "https://www.amazon.com/Amazon-Video/b/?&node=2858778011&ref=dvm_MLP_ROWNA_US_1",
    searchurl: "https://www.amazon.com/s?i=instant-video&ref=nb_sb_noss_2&k="
  },
  p: {
    name: "Piazza",
    url: "https://piazza.com/class"
  },
  vs: {
    name: "VS Code",
    url: "vscode://"
  },
  wf: {
    name: "Webflow",
    url: "https://webflow.com/design/hoohacks"
  },
  hs: {
    name: "Hubspot",
    url: "https://app.hubspot.com/"
  },
  $: {
    name: "Robinhood",
    url: "https://robinhood.com/",
    searchurl: "https://robinhood.com/stocks/"
  },
  c: {
    name: "Robinhood Crypto",
    url: "https://robinhood.com/",
    searchurl: "https://robinhood.com/crypto/"
  },
  cal: {
    name: "Google Calendar",
    url: "https://calendar.google.com/calendar/r"
  },
  uvacovid: {
    name: "UVA COVID-19 Tracker",
    url: "https://returntogrounds.virginia.edu/covid-tracker"
  },
  wiki: {
    name: "Wikipedia",
    url: "https://en.wikipedia.org",
    searchurl: "https://en.wikipedia.org/wiki/"
  },
  todo: {
    name: "Microsoft To Do",
    url: "https://to-do.live.com"
  },
  DEFAULT: {
    name: "Default - Google Search",
    url: "https://google.com/",
    searchurl: "https://www.google.com/search?q="
  }
};const redirect = async function (url) {
  await window.location.replace(url);
};
const bunnylol = async function (currCmd) {
  let arr = [];
  if (currCmd.startsWith("$")) {
    arr = currCmd.split(/[ $+]/g);
    arr[0] = "$";
    if (arr[1] === "") {
      arr = ["$"];
    }
  } else {
    arr = currCmd.split(/[ +]/g);
  }
  if (arr.length > 0) {
    const prefix = arr[0].endsWith(".") ? arr[0].substring(0, arr[0].length - 1).toLowerCase() : arr[0].toLowerCase();
    if (prefix in COMMANDS) {
      // $FlowFixMe - this is actually correct since the prefix is a key.
      const command = COMMANDS[prefix];
      const protocol = new URL(command.url).protocol;
      if (protocol !== "https:" && protocol !== "http:") {
        viewHelpPage();
      }
      if (command.searchurl && arr.length !== 1) {
        const searchParam = prefix !== "$" ? prefix.length + 1 : prefix.length;
        await redirect(`${command.searchurl}${encodeURIComponent(currCmd.substr(searchParam))}`);
        return true;
      } else {
        await redirect(command.url);
        return true;
      }
    }
  }
  return false;
};
const currCmd = new URL(window.location.href).searchParams.get("search") ?? "help";
switch (currCmd) {
  case "help" :
    viewHelpPage();
    break;
  default:
    bunnylol(currCmd).then(done => {
      if (!done && COMMANDS.DEFAULT.searchurl) {
        redirect(`${COMMANDS.DEFAULT.searchurl}${encodeURIComponent(currCmd)}`);
      }
    }).catch(reject => {
      console.log(reject);
    });
    break;
}