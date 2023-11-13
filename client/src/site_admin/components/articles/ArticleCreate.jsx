import { Create } from 'react-admin';
import ArticleForm from './ArticleForm';

function ArticleCreate() {
    return (
        <Create redirect="show">
            <ArticleForm newRecord />
        </Create>
    );
}

export default ArticleCreate;
