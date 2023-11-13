import { Create } from 'react-admin';
import BookForm from './BookForm';

function BookCreate() {
    return (
        <Create redirect="show">
            <BookForm newRecord />
        </Create>
    );
}

export default BookCreate;

// [-] TODO
// Make sure if published=true, also sends the current date as publishDate...
