import { getList } from '@/main/api/getResourceItems';
import BookCard from '@/main/components/cards/BookCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';

export default async function BooksList() {
    const books = await getList('books');

    return (
        <>
            {/* <Suspense fallback={<ResourceCardSkeleton hasMedia />}> */}
            {/* {console.log('Books: ', props.books)} */}

            {books.length > 0 ? (
                books.map(book => <BookCard key={book._id} book={book} />)
            ) : (
                <NoItemsMessage message={'No books found'} />
            )}
            {/* </Suspense> */}
        </>
    );
}
