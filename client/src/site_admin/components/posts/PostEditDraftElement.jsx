import {
    BooleanInput,
    TextInput,
    useRecordContext,
    FormDataConsumer,
} from 'react-admin';

function PostEditDraftElement() {
    const record = useRecordContext();

    return (
        !record.published && (
            <>
                <BooleanInput source="published" label="Publish?" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.published && (
                            <TextInput
                                source="teaser"
                                multiline
                                rows={3}
                                className="form"
                                variant="outlined"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
            </>
        )
        //     (
        // toBePublished && <TextInput source="teaser"  />
        // )
    );
}

export default PostEditDraftElement;
