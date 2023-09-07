import { useRecordContext } from 'react-admin';

function ArticleTitle() {
    const record = useRecordContext();

    return <span>Article: {record && `"${record.title}"`}</span>;
}

export default ArticleTitle;
