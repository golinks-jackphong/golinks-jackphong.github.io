## To Links ##

This is my implementation of go links / bunnylol / internal search shortcut tools.

To use add `<webserver ip> <prefix>` as an entry in `/etc/hosts`.

Entering `<prefix>/<command>` in the url bar will navigate to the command's url.

Some commands also support search, like `<prefix>/<command> <search string>` will navigate to the search URL and search for the string. Ex: `to/yt family guy funny clips`

To update commands, just edit the markdown table below.

Commands:
| Name             | Command | url                              | searchUrl                                     |
|------------------|---------|----------------------------------|-----------------------------------------------|
| youtube          | yt      | https://youtube.com              | https://www.youtube.com/results?search_query= |
| Personal Capital | pc      | https://home.personalcapital.com |                                               |