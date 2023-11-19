import {
    List,
    Datagrid,
    ImageField,
    TextField,
    UrlField,
    WrapperField,
    TextInput,
    SelectArrayInput,
    EditButton,
    DateField,
    ShowButton,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import filterVars from '@/admin/data/listFilterVars.json';

const imageFilters = [
    <TextInput label="Search" source="q" alwaysOn variant="outlined" />,
    <SelectArrayInput
        source="group"
        choices={filterVars.imagesGroups}
        optionText="label"
        optionValue="id"
        variant="outlined"
    />,
];

function ImageList() {
    const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List
            filters={imageFilters}
            sort={{ field: 'createdAt', order: 'DESC' }}>
            {isXSmall ? (
                <Datagrid
                    rowClick="show"
                    bulkActionButtons={false}
                    sx={{
                        '& .column-url': { width: '80px' },
                    }}>
                    <ImageField source="url" label="Thumbnail" />
                    <TextField source="title" />
                </Datagrid>
            ) : isTablet ? (
                <Datagrid
                    rowClick="show"
                    sx={{
                        '& .column-url': { width: '100px' },
                    }}>
                    <ImageField source="url" label="Thumbnail" />
                    <TextField source="title" />

                    <DateField source="createdAt" label="Created" />
                </Datagrid>
            ) : (
                <Datagrid
                    rowClick={false}
                    sx={{
                        '& .column-url': { width: '100px' },
                        '& .column-createdAt': {
                            width: '150px',
                            textAlign: 'right',
                        },
                        '& .column-title': { minWidth: '150px' },
                    }}>
                    <ImageField source="url" label="Thumbnail" />
                    <TextField source="title" />
                    <UrlField
                        source="url"
                        style={{
                            display: 'inline-block',
                            maxWidth: '130px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    />
                    <TextField
                        source="description"
                        style={{
                            display: 'inline-block',
                            maxWidth: '250px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    />

                    <DateField source="createdAt" showTime />
                    <WrapperField textAlign="right">
                        <ShowButton />
                        <EditButton />
                    </WrapperField>
                </Datagrid>
            )}
        </List>
    );
}

export default ImageList;
