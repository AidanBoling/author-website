import { Edit } from 'react-admin';
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
