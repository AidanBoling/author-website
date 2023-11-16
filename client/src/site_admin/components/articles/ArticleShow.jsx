import {
    Show,
    TabbedShowLayout,
    TextField,
    RichTextField,
    DateField,
    UrlField,
    WithRecord,
} from 'react-admin';
import { Typography } from '@mui/material';
import ArticleTitle from './ArticlePageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';
import CustomShowImageField from '../ImageShowField';

function ArticleShow() {
    const imageSx = {
        '& img': {
            minHeight: '200px',
            minWidth: '250px',
            objectFit: 'contain',
        },
    };

    return (
        <Show title={<ArticleTitle />}>
            <WithRecord
                label={false}
                render={record => (
                    <Typography variant="h4" component="h2" mb="1rem">
                        {record.title}
                    </Typography>
                )}
            />
            <TabbedShowLayout spacing={2}>
                <TabbedShowLayout.Tab label="summary">
                    <CustomShowImageField sx={imageSx} />
                    <DateField source="datePublished" />
                    <TextField source="publisher.name" />
                    <UrlField source="publisher.website" />
                    <DateField
                        source="updatedAt"
                        label="Last Updated"
                        showTime
                    />
                    <RecordTagsFieldLabel>
                        <TagsListEdit resource="articles" />
                    </RecordTagsFieldLabel>
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="content">
                    <CustomShowImageField sx={imageSx} />
                    <RichTextField source="content" label={false} />
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
}

export default ArticleShow;
