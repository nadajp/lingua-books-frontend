import BookThumbnail from "./bookThumb";
import Filters from "./filters";

export default function Bookstore({ books }) {
    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
            <div>
                <Filters />
            </div>
            <div className="grid gap-8 xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                {books.map((book, index) => (
                    <BookThumbnail key={book.id} book={ book } index={ index }/>
                ))}
            </div>
        </div>
    )
}
