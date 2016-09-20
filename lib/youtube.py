#!/usr/bin/python
import sys

from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser

if __name__ == "__main__":  # if only this file is being tested
    sys.path.insert(0, '../')  # allow developer key to import

try:
    from config.config import DEVELOPER_KEY
except Exception as error:
    print(error)
    print("Run: cp config/config_example.py config/config.py")
    print("then add your YouTube API developer key to the new config file")
    sys.exit(1)


# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
#   https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def youtube_search(search_term):
    max_results = 25

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # Call the search.list method to retrieve results matching the specified
    # query term.
    search_response = youtube.search().list(
        q=search_term,
        part="id,snippet",
        maxResults=max_results
    ).execute()

    videos = []
    channels = []
    playlists = []

    # Add each result to the appropriate list, and then display the lists of
    # matching videos, channels, and playlists.
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            video = {
                "title": search_result["snippet"]["title"],
                "_id": search_result["id"]["videoId"]
            }
            videos.append(video)
        elif search_result["id"]["kind"] == "youtube#channel":
            channel = {
                "title": search_result["snippet"]["title"],
                "_id": search_result["id"]["channelId"]
            }
            channels.append(channel)
        elif search_result["id"]["kind"] == "youtube#playlist":
            playlist = {
                "title": search_result["snippet"]["title"],
                "_id": search_result["id"]["playlistId"]
            }
            playlists.append(playlist)

    results = {
        "videos": videos,
        "channels": channels,
        "playlists": playlists
    }
    return results


if __name__ == "__main__":
    try:
        search("news")
    except HttpError as error:
        print "An HTTP error {0} occurred:\n{1}".format(error.resp.status, error.content)
