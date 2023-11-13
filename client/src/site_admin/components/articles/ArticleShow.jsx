import {
    Show,
    TabbedShowLayout,
    TextField,
    RichTextField,
    DateField,
    ImageField,
    UrlField,
    WithRecord,
} from 'react-admin';
import { Typography } from '@mui/material';
import ArticleTitle from './ArticlePageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function ArticleShow() {
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
                    <ImageField
                        source="image.url"
                        label={false}
                        sx={{
                            '& img': {
                                minHeight: '200px',
                                minWidth: '250px',
                                objectFit: 'contain',
                            },
                        }}
                    />
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
                    <ImageField source="image.url" label={false} />
                    <RichTextField source="content" label={false} />
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
}

export default ArticleShow;
