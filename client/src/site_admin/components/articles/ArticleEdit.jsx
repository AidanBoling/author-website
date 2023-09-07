import { Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import ArticleTitle from './ArticlePageTitle';
import ArticleForm from './ArticleForm';

function ArticleEdit() {
    return (
        <Edit title={<ArticleTitle />} redirect="show">
            <ArticleForm />
        </Edit>
    );
}

export default ArticleEdit;
