'use client';
import { Menu } from 'react-admin';
// import BookIcon from '@mui/icons-material/Book';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedIcon from '@mui/icons-material/Feed';
import ImageIcon from '@mui/icons-material/Image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Typography,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';

export default function CustomMenu() {
    return (
        <Menu>
            <Menu.DashboardItem />
            <Divider />
            <Menu.Item
                to={{
                    pathname: '/posts',
                    search: `filter=${JSON.stringify({ published: false })}`,
                }}
                primaryText="Draft Posts"
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
            <Menu.ResourceItem name="tags" />
            <Divider textAlign="left" sx={{ paddingTop: '1rem', margin: 0 }}>
                <Typography>
                    <ImageIcon
                        sx={{
                            marginRight: '.4rem',
                            // marginTop: '.5rem',
                            marginBottom: '-.4rem',
                        }}
                    />
                    Images
                </Typography>
            </Divider>
            <Menu.Item
                to="/images?filter=%7B%7D"
                primaryText="All"
                leftIcon={false}
            />
            <Menu.Item
                to={{
                    pathname: '/images',
                    search: `filter=${JSON.stringify({
                        group: ['Site Pages'],
                    })}`,
                }}
                primaryText="Site Pages"
                leftIcon={false}
            />
        </Menu>
    );
}

//
//
//
// TEMP Archive ------------------------
//

//
// <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="posts-content"
//                     id="posts-header">
//                     <Typography>Posts</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Menu.Item
//                         to={{
//                             pathname: '/posts',
//                             search: `filter=${JSON.stringify({
//                                 published: false,
//                             })}`,
//                         }}
//                         primaryText="Drafts"
//                         leftIcon={<FeedIcon />}
//                     />
//                     <Menu.Item
//                         to={{
//                             pathname: '/posts',
//                             search: `filter=${JSON.stringify({
//                                 published: true,
//                             })}`,
//                         }}
//                         primaryText="Posts"
//                         leftIcon={<FeedIcon />}
//                     />
//                 </AccordionDetails>
//             </Accordion>
