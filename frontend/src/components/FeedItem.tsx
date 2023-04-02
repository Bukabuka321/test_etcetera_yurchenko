const FeedItem = ({ title, creator, content, link }: IFeedItem) => {
  return (
    <>
      <div className="w-[50%] border-solid border-2 border-black">
        <div className="text-black px-4 flex flex-col gap-y-4">
          <h2 className="font-bold text-2xl">{title}</h2>
          <h4>{creator}</h4>
          <p className="font-light text-lg">{content}</p>
          <a href={link} className="hover:text-[#FAC520]">
            Джерело
          </a>
        </div>
      </div>
    </>
  );
};

export default FeedItem;
