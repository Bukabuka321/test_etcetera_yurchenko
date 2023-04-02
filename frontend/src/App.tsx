import { useEffect, useState } from "react";
import FeedItem from "./components/FeedItem";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  // Maintain the state of feeds and pageNumber with their respective setters
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  // Fetch feeds through HTTP GET request using axios library
  const getFeeds = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/feeds");
      const data = response.data;
      // Set fetched data to `feeds` state object
      setFeeds(data);
      console.log(data); // Log data to console upon successful fetch
    } catch (error) {
      console.log(error); // Log error message to console in case of error during API call
    }
  };

  // Fetch feeds only once when component mounts using useEffect hook
  useEffect(() => {
    getFeeds();
  }, []);

  // Initialize items per page and calculate pages visited based on `pageNumber`
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  // Calculate total number of pages required for pagination based on number of items
  const pageCount = Math.ceil(feeds.length / itemsPerPage);

  // Update `pageNumber` state on page change event
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  // Create array of feeds on current page by slicing feeds array and mapping it to FeedItem component
  const displayFeeds = feeds
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((feed) => {
      return (
        <div key={feed.id}>
          <FeedItem
            title={feed.title}
            creator={feed.creator}
            content={feed.content}
            link={feed.link}
          />
        </div>
      );
    });

  // Return JSX to display feeds and pagination UI components
  return (
    <>
      <div className="flex flex-col items-center py-4 gap-4">
        {displayFeeds} {/* Display the feeds */}
        <ReactPaginate
          className="flex flex-row gap-3"
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="pagination"
          previousLinkClassName="previous_page"
          nextLinkClassName="next_page"
          disabledClassName="disabled"
          activeClassName="text-[#FAC520]"
        />
        {/* Display React Paginate pagination UI */}
      </div>
    </>
  );
}

export default App;
