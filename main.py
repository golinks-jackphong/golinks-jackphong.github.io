from fastapi import FastAPI
from fastapi.responses import RedirectResponse

import re

app = FastAPI(docs_url = None, redoc_url = None)

TABLE_HEADER = "| Name             | Command | url                              | searchUrl                                     |\n|------------------|---------|----------------------------------|-----------------------------------------------|\n"
REDIRECT_DICT = {}

def extract_markdown_table():
	rowRegex = re.compile("\|\s*([^\s|\n]+(?:[\s][^\s|]+)?)")
	with open("readme.md") as f:
		readmeString = f.read()
		
		tableText = readmeString[readmeString.index(TABLE_HEADER) + len(TABLE_HEADER):]

		for row in tableText.split("\n"):
			rowEntries = rowRegex.findall(row)

			if len(rowEntries) == 3:
				REDIRECT_DICT[rowEntries[1]] = {
					"url" : rowEntries[2]
				}
			else:
				REDIRECT_DICT[rowEntries[1]] = {
					"url" : rowEntries[2],
					"searchUrl" : rowEntries[3]
				}

extract_markdown_table()

@app.get("/{redirect_string}")
async def redirect(redirect_string):
	redirect_strings = redirect_string.split()

	redirect_command = redirect_strings[0]

	if redirect_command in REDIRECT_DICT:

		redirect_info = REDIRECT_DICT[redirect_command]

		if "searchUrl" in redirect_info and len(redirect_strings) > 1:
			return RedirectResponse(redirect_info["searchUrl"] + "+".join(redirect_strings[1:]), status_code=302)
		else:
			return RedirectResponse(redirect_info["url"], status_code=302)
	else:
		return RedirectResponse("https://www.google.com/search?q=" + redirect_string)
