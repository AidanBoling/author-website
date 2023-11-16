'use client';
import { Menu } from 'react-admin';
// import BookIcon from '@mui/icons-material/Book';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedIcon from '@mui/icons-material/Feed';

export default function CustomMenu() {
    return (
        <Menu>
            <Menu.DashboardItem />

            <Menu.Item
                to={{
                    pathname: '/posts',
                    search: `filter=${JSON.stringify({ published: false })}`,
                }}
                primaryText="Drafts"
                leftIcon={<FeedIcon />}
            />
            <Menu.Item
                to={{
                    pathname: '/posts',
                    search: `filter=${JSON.stringify({ published: true })}`,
                }}
                primaryText="Posts"
                leftIcon={<FeedIcon />}
            />
            {/* <Menu.ResourceItem name="posts" /> */}

            <Menu.ResourceItem name="books" />
            <Menu.ResourceItem name="articles" />
            <Menu.ResourceItem name="events" />
            <Menu.ResourceItem name="images" />
            <Menu.ResourceItem name="tags" />
        </Menu>
    );
}
