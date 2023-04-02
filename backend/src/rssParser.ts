import RSSParser from "rss-parser"; // Importing rss-parser library to parse RSS feeds
import { Response, Request } from "express"; // Importing Response and Request interfaces from express library
import database from "./database"; // Importing the database connection pool

// Creating an instance of the RSSParser class
const rssParser = new RSSParser();

// Defining an async function that takes a request and response object as parameters
export const parseRSS = async (req: Request, res: Response) => {
  try {
    const feedUrl = "https://ain.ua/feed/"; // Storing the URL of the RSS feed to be parsed
    const feed = await rssParser.parseURL(feedUrl); // Parsing the RSS feed using the rssParser instance

    // Checking if there are at least 10 items in the feed before slicing it
    const items =
      feed.items.length >= 10 ? feed.items.slice(0, 10) : feed.items;

    const articles: any[] = []; // Creating an empty array for storing individual articles from the feed

    // Looping through each item in the feed and extracting relevant information
    for (const item of items) {
      const article = {
        title: item.title,
        link: item.link,
        pub_date: item.pubDate,
        creator: item.creator,
        content: item.content,
      };
      // Checking if the article already exists in the database
      let [results]: any = await database.query(
        `SELECT COUNT(*) AS count FROM feeds WHERE title = ? AND link = ?`,
        [article.title, article.link]
      );

      const count = results[0].count;
      if (count === 0) {
        // If the article doesn't exist in the database, insert it
        try {
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
          // Add the inserted article to the list of articles for sending response to client
          articles.push(article);
        } catch (err) {
          console.error(err);
          res.status(500).send("Error inserting article into database");
          return;
        }
      }
    }

    res.status(200);
  } catch (err) {
    console.error(err); // Logging the error to console if something goes wrong
    res.status(500).send("Error fetching or parsing RSS feed"); // Sending HTTP error status code (500) to the client indicating failure of the operation
  }
};
