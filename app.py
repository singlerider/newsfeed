#!/usr/bin/env python

import os

import lib.scraper as scraper
import requests
from flask import Flask

app = Flask(__name__)


@app.route("/")
def render_feed():
    random_feed = scraper.fetch_feed()
    link = random_feed["link"]
    title = random_feed["title"]
    summary = random_feed["summary"]
    media = random_feed["media_content"]
    nl = "<br>"
    return link + nl + title + nl + summary + nl + str(media)


if __name__ == "__main__":
    # This allows us to use a plain HTTP callback
    os.environ["DEBUG"] = "1"
    app.secret_key = os.urandom(24)
    app.run(host="0.0.0.0", port=8080)
