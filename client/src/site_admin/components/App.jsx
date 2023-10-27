'use client';
import {
    Admin,
    Resource,
    Layout,
    CustomRoutes,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    defaultTheme,
    Authenticated,
} from 'react-admin';
import { Route } from 'react-router-dom';
import { customLightTheme, customDarkTheme } from './themeCustom';
import '@/admin/styles/styles.css';
import BookIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedIcon from '@mui/icons-material/Feed';
import LabelIcon from '@mui/icons-material/Label';

import myDataProvider from '../dataProvider';
import { authProvider } from '../authProvider';

import CustomMenu from './CustomMenu';
import CustomAppBar, { MyAppBar } from './CustomAppBar';
import Dashboard from './Dashboard';

//Resources
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
import EventList from './events/EventList';
import EventShow from './events/EventShow';
import EventCreate from './events/EventCreate';
import EventEdit from './events/EventEdit';
import TagList from './tags/TagList';
import TagShow from './tags/TagShow';

//Custom pages
import SecuritySettings from './user/SecuritySettings';
import MyLoginPage from './MFALoginPage';
import AccountPage from './user/AccountPage';
import RegisterMFAMethod from './user/RegisterMFAMethod';
import Register from './Register';
import PasswordReset from './PasswordReset';

import AccessCodeForm from './AccessCodePage';

// const lightTheme = customLightTheme;
// const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } };

function DashboardRequireAuth(props) {
    return (
        <Authenticated requireAuth>
            <Dashboard />
        </Authenticated>
    );
}

function CustomLayout(props) {
    return <Layout {...props} appBar={CustomAppBar} menu={CustomMenu} />;
}

function AdminApp() {
    return (
        <Admin
            basename="/admin"
            layout={CustomLayout}
            dataProvider={myDataProvider}
            authProvider={authProvider}
            theme={customLightTheme}
            darkTheme={customDarkTheme}
            // loginPage={MyLoginPage}
            authCallbackPage={MyLoginPage}
            dashboard={DashboardRequireAuth}
            // requireAuth
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
            <Resource
                name="events"
                list={EventList}
                show={EventShow}
                create={EventCreate}
                edit={EventEdit}
                icon={CalendarMonthIcon}
            />
            <Resource
                name="tags"
                list={TagList}
                show={TagShow}
                icon={LabelIcon}
                recordRepresentation="name"
            />
            <CustomRoutes noLayout>
                <Route path="/use/code" element={<AccessCodeForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-reset" element={<PasswordReset />} />
            </CustomRoutes>
            <CustomRoutes>
                <Route
                    path="/user"
                    element={
                        <Authenticated requireAuth>
                            <AccountPage />
                        </Authenticated>
                    }
                />
                <Route
                    path="/user/security"
                    element={
                        <Authenticated requireAuth>
                            <SecuritySettings />
                        </Authenticated>
                    }
                />
                <Route
                    path="/user/security/enable-mfa"
                    element={
                        <Authenticated requireAuth>
                            <RegisterMFAMethod />
                        </Authenticated>
                    }
                />

                {/* <Route path="/login-mfa" element={<MyLoginPage />} /> */}
            </CustomRoutes>
        </Admin>
    );
}

export default AdminApp;

// TODO
// Create hierarchical branch for Posts -- to show Published and Drafts
//
