import { FaEye, FaStar, FaShareAlt, FaBookmark } from "react-icons/fa";
import { Link } from "react-router";

const NewsCard = ({ news }) => {
    const {
        id,
        title,
        author,
        thumbnail_url,
        details,
        rating,
        total_view,
        tags,
    } = news;

    // Format date nicely
    const formattedDate = new Date(author.published_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex items-center gap-3">
                    <img
                        src={author.img}
                        alt={author.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">{author.name}</h2>
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                </div>
                <div className="flex gap-3 text-gray-500 text-xl">
                    <FaBookmark className="cursor-pointer hover:text-primary" />
                    <FaShareAlt className="cursor-pointer hover:text-primary" />
                </div>
            </div>

            {/* Title */}
            <div className="px-4 mt-3">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {title}
                </h3>
            </div>

            {/* Image */}
            <figure className="px-4 pt-3">
                <img
                    src={thumbnail_url}
                    alt="News Thumbnail"
                    className="rounded-lg w-full object-cover"
                />
            </figure>

            {/* Details */}
            <div className="px-4 pt-3 pb-2 text-sm text-gray-700">
                <p>
                    {details.length > 250 ? (
                        <>
                            {details.slice(0, 250)}...
                            <Link to={`/newsDetails/${id}`} className="text-primary font-semibold cursor-pointer">
                                {" "}
                                Read More
                            </Link>
                        </>
                    ) : (
                        details
                    )}
                </p>
            </div>

            {/* Tags */}
            <div className="px-4 pb-2 text-xs text-gray-500">
                <p>
                    <strong>Tags:</strong>{" "}
                    {tags.map((tag, index) => (
                        <span key={index} className="mr-1">
                            #{tag}
                        </span>
                    ))}
                </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                <div className="flex items-center text-warning">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="mr-1" />
                    ))}
                    <span className="ml-2 text-gray-700 font-semibold">
                        {rating.number.toFixed(1)}
                    </span>
                </div>
                <div className="flex items-center text-gray-600">
                    <FaEye className="mr-1" />
                    <span>{total_view}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
