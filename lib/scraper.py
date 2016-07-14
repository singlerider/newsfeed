from bs4 import BeautifulSoup
import feedparser
import random

def fetch_feed():
    feed = feedparser.parse("http://rss.cnn.com/rss/cnn_topstories.rss")
    return random.choice(feed["entries"])

if __name__ == "__main__":
    random_feed = fetch_feed()
    link = random_feed["link"]
    title = random_feed["title"]
    summary = random_feed["summary"]
    media = random_feed["media_content"]
    print(link, title, summary, media)
