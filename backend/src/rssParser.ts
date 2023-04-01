import RSSParser from "rss-parser";
import { Response, Request } from "express";
import database from "./database";

export const rssParser = async (req: Request, res: Response) => {
  try {
    const feedUrl = "https://ain.ua/feed/";
    const feed = await new RSSParser().parseURL(feedUrl);
    const articles: any = [];

    feed.items.slice(0, 10).forEach((item) => {
      articles.push({
        title: item.title,
        link: item.link,
        pub_date: item.pubDate,
        creator: item.creator,
        content: item.content,
      });
    });

    // Insert each article into the mySQL table
    for (const article of articles) {
      await database.execute(
        `INSERT INTO feeds (title, link, pub_date, creator, content) VALUES (?, ?, ?, ?, ?)`,
        [
          article.title,
          article.link,
          article.pub_date,
          article.creator,
          article.content,
        ]
      );
    }

    // Close the mySQL connection
    await database.end();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching RSS feed");
  }
};
