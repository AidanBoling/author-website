import { Create } from 'react-admin';
import ArticleForm from './ArticleForm';

function ArticleCreate() {
    return (
        <Create redirect="show">
            <ArticleForm />
        </Create>
    );
}

export default ArticleCreate;
