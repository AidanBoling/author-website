import { Edit } from 'react-admin';
import PageTitle from '../PageTitle';
import BookForm from './BookForm';

function BookEdit() {
    return (
        <Edit title={<PageTitle resourceName="Book" />} redirect="show">
            <BookForm />
        </Edit>
    );
}

export default BookEdit;
