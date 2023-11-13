import { useState } from 'react';
import { ReferenceArrayInput, AutocompleteArrayInput } from 'react-admin';
import { TagChip } from './TagField';
import CreateTagDialog from './CreateTagDialog';

export default function CreateResourceTagsField({ resource }) {
    // const [dialogOpen, setDialogOpen] = useState(true);

    const inputText = choice => choice.name;
    const matchSuggestion = (filter, choice) => {
        return choice.name.toLowerCase().includes(filter.toLowerCase());
    };

    const optionText = <TagChip />;
    const filterToQuery = searchText => ({ name: `${searchText}` });

    return (
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
                        resource={resource}
                        isOpen={true}
                        // setOpen={setDialogOpen}
                        newRecord
                    />
                }
                disableCloseOnSelect
                blurOnSelect={false}
            />
        </ReferenceArrayInput>
    );
}
