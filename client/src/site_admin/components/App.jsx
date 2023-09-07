import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from 'react-admin';
import '../css/styles.css';
import BookIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FeedIcon from '@mui/icons-material/Feed';
import myDataProvider from '../dataProvider';

import Dashboard from './Dashboard';
// import { UserList } from './UserList';
// import UserShow from './UserShow';
import PostList from './posts/PostList';
import PostShow from './posts/PostShow';
import PostEdit from './posts/PostEdit';
import PostCreate from './posts/PostCreate';
import BookList from './books/BookList';
import BookShow from './books/BookShow';
import BookCreate from './books/BookCreate';
import BookEdit from './books/BookEdit';
import ArticleList from './articles/ArticleList';
import ArticleShow from './articles/ArticleShow';
import ArticleCreate from './articles/ArticleCreate';
import ArticleEdit from './articles/ArticleEdit';

// import authProvider from './authProvider';

function AdminApp() {
    return (
        <Admin
            basename="/admin"
            dataProvider={myDataProvider}
            dashboard={Dashboard}
            //   authProvider={authProvider}
        >
            <Resource
                name="posts"
                list={PostList}
                show={PostShow}
                create={PostCreate}
                edit={PostEdit}
                icon={FeedIcon}
            />
            <Resource
                name="books"
                list={BookList}
                show={BookShow}
                create={BookCreate}
                edit={BookEdit}
                icon={BookIcon}
            />
            <Resource
                name="articles"
                list={ArticleList}
                show={ArticleShow}
                create={ArticleCreate}
                edit={ArticleEdit}
                icon={NewspaperIcon}
            />
            {/* <Resource name="users" list={UserList} show={UserShow} recordRepresentation="name" icon={UserIcon} /> */}
        </Admin>
    );
}

export default AdminApp;

// TODO
// Create hierarchical branch for Posts -- to show Published and Drafts
//
