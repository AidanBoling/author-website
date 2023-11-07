import {
    Create,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    SimpleForm,
    TextInput,
    BooleanInput,
} from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';
import { TagChip } from '../TagField';
import CreateTagDialog from '../CreateTagDialog';

// function TagNameColorIndicator() {
//     const record = useRecordContext();
//     if (!record) return null;
//     return (
//         <Box display="flex">
//             <Box
//                 sx={{
//                     bgcolor: record.color,
//                     width: 15,
//                     height: 15,
//                     borderRadius: 15,
//                     alignSelf: 'center',
//                     flexShrink: 0,
//                     display: 'inline-block',
//                     m: '.2rem',
//                     // mt: '.4rem',
//                 }}
//             />
//             <Typography>{record.name}</Typography>
//         </Box>
//     );
// }

function PostCreate() {
    const inputText = choice => choice.name;
    const matchSuggestion = (filter, choice) => {
        return choice.name.toLowerCase().includes(filter.toLowerCase());
    };

    const optionText = <TagChip />;
    const filterToQuery = searchText => ({ name: `${searchText}` });

    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" className="form" />
                <RichTextInput
                    source="content.richText"
                    editorOptions={DefaultEditorOptions}
                    className="form"
                />
                {/* <TextInput source="content" multiline rows={5} /> */}
                <ReferenceArrayInput
                    label="Tags"
                    source="tags"
                    reference="tags"
                    enableGetChoices={({ q }) => q && q.length >= 2}
                    sort={{ field: 'name', order: 'ASC' }}>
                    <AutocompleteArrayInput
                        label="Tags"
                        optionText={optionText}
                        optionValue="_id"
                        inputText={inputText}
                        matchSuggestion={matchSuggestion}
                        filterToQuery={filterToQuery}
                        create={
                            <CreateTagDialog
                                resource="posts"
                                isOpen={true}
                                newRecord
                            />
                        }
                        disableCloseOnSelect
                        blurOnSelect={false}
                    />
                </ReferenceArrayInput>

                <BooleanInput source="published" label="Publish" />
            </SimpleForm>
        </Create>
    );
}

export default PostCreate;

// TODO
// Make sure if published=true, also sends the current date as publishDate...
