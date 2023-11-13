import { Create } from 'react-admin';
import PostForm from './PostForm';

// function TagNameColorIndicator() {
//     const record = useRecordContext();
//     if (!record) return null;
//     return (
//         <Box display="flex">
//             <Box
//                 sx={{
//                     bgcolor: record.color,
//                     width: 15,
//                     height: 15,
//                     borderRadius: 15,
//                     alignSelf: 'center',
//                     flexShrink: 0,
//                     display: 'inline-block',
//                     m: '.2rem',
//                     // mt: '.4rem',
//                 }}
//             />
//             <Typography>{record.name}</Typography>
//         </Box>
//     );
// }

function PostCreate() {
    return (
        <Create>
            <PostForm newRecord />
        </Create>
    );
}

export default PostCreate;

// [-] TODO
// Make sure if published=true, also sends the current date as publishDate...
