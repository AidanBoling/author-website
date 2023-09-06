import { useRecordContext } from 'react-admin';

function BookTitle() {
    const record = useRecordContext();

    return <span>Book: {record && `"${record.title}"`}</span>;
}

export default BookTitle;
