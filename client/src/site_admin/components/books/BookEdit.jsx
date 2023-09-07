import { Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import BookTitle from './BookPageTitle';
import BookForm from './BookForm';

function BookEdit() {
    return (
        <Edit title={<BookTitle />} redirect="show">
            <BookForm />
        </Edit>
    );
}

export default BookEdit;
