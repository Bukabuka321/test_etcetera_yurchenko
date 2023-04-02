import RSSParser from "rss-parser"; // Importing rss-parser library to parse RSS feeds
import { Response, Request } from "express"; // Importing Response and Request interfaces from express library
import database from "./database"; // Importing the database connection pool

// Defining an async function that takes a request and response object as parameters
export const rssParser = async (req: Request, res: Response) => {
  try {
    const feedUrl = "https://ain.ua/feed/"; // Storing the URL of the RSS feed to be parsed
    const feed = await new RSSParser().parseURL(feedUrl); // Parsing the RSS feed using rss-parser library and the provided URL
    const articles: any = []; // Creating an empty array for storing individual articles from the feed

    // Looping through each item in the feed and extracting relevant information
    feed.items.forEach((item) => {
      articles.push({
        title: item.title,
        link: item.link,
        pub_date: item.pubDate,
        creator: item.creator,
        content: item.content,
      });
    });

    // Inserting each article into the MySQL table by executing SQL query
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

    // Closing the MySQL connection
    await database.end();

    res.sendStatus(200); // Sending HTTP success status code (200) to the client indicating successful completion of the operation
  } catch (err) {
    console.error(err); // Logging the error to console if something goes wrong
    res.status(500).send("Error fetching RSS feed"); // Sending HTTP error status code (500) to the client indicating failure of the operation
  }
};
