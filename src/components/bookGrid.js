import BookThumbnail from "./bookThumb";
import Filters from "./filters";

export default function BookGrid({ books }) {
    return (
        <div className="container xl:max-w-screen-xl mx-5 py-12 px-2">
            <div className="grid gap-2 xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                <div className="">
                    <Filters />
                </div>
                {books.map((book, index) => (
                    <BookThumbnail key={book.id} book={ book } index={ index }/>
                ))}
            </div>
        </div>
    )
}
