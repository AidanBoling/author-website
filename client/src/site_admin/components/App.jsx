import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from 'react-admin';
import '../css/styles.css';
import PostIcon from '@mui/icons-material/Book';
import myDataProvider from '../dataProvider';

import Dashboard from './Dashboard';
// import { UserList } from './UserList';
// import UserShow from './UserShow';
import PostList from './posts/PostList';
import PostShow from './posts/PostShow';
import PostEdit from './posts/PostEdit';
import PostCreate from './posts/PostCreate';
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
                icon={PostIcon}
            />

            {/* <Resource name="users" list={UserList} show={UserShow} recordRepresentation="name" icon={UserIcon} /> */}
        </Admin>
    );
}

export default AdminApp;

// TODO
// Create hierarchical branch for Posts -- to show Published and Drafts
//
