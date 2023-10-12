import { Labeled } from 'react-admin';

export default function RecordFieldLabel(props) {
    return (
        <Labeled
            label={props.label}
            sx={{
                fontStyle: 'italic',
                fontSize: '1.25rem',
                pl: '.5rem',
            }}>
            {props.children}
        </Labeled>
    );
}
