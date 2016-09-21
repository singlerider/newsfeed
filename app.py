#!/usr/bin/env python

import os

import requests

import lib.scraper as scraper
from lib.youtube import youtube_search
from bs4 import BeautifulSoup
from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)


@app.route("/")
def render_feed():
    """The main route for the project"""
    random_feed = scraper.fetch_feed()
    data = {
        "link": random_feed["link"],
        "title": random_feed["title"],
        "summary": BeautifulSoup(
            random_feed["summary"], 'html.parser'
        ).prettify(),
        "media": random_feed["media_content"],
        "nl": "<br>"
    }
    return render_template('index.html', data=data)


@app.route("/videos")
def retrieve_videos():
    """Used as an endpoint for retrieving YouTube search results as json"""
    date_string = datetime.now().strftime("%B %d %Y")
    videos = youtube_search("news " + date_string)
    return jsonify(videos=videos)

if __name__ == "__main__":
    # This allows us to use a plain HTTP callback
    os.environ["DEBUG"] = "1"
    app.secret_key = os.urandom(24)
    app.run(host="0.0.0.0", port=8080)
