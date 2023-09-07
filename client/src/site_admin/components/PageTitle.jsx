import { useRecordContext } from 'react-admin';

function PageTitle(props) {
    const record = useRecordContext();

    return (
        <span>
            {props.resourceName}: {record && `"${record.title}"`}
        </span>
    );
}

export default PageTitle;
