import {
    ReferenceField,
    Show,
    TabbedShowLayout,
    TextField,
    RichTextField,
    DateField,
    ImageField,
    UrlField,
    Labeled,
} from 'react-admin';
import ArticleTitle from './ArticlePageTitle';
import TagsListEdit, { RecordTagsFieldLabel } from '../TagsListEdit';

function ArticleShow() {
    return (
        <Show title={<ArticleTitle />}>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="summary">
                    <ImageField source="image.url" label={false} />
                    <TextField source="title" />
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
