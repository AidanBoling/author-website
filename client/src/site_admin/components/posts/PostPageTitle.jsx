import { useRecordContext } from "react-admin";

function PostTitle() {
  const record = useRecordContext();

  return <span>Post {record ? `"${record.title}"` : ""}</span>;
}

export default PostTitle;
