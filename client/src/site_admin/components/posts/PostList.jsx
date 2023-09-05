import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  TextInput,
  ReferenceInput,
  EditButton,
  DateField,
} from "react-admin";

// const postFilters = [
//   <TextInput source="q" label="Search" alwaysOn />,
//   <ReferenceInput source="userId" label="User" reference="users" />,
// ];

function PostList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <DateField source="createdAt" />

        {/* <TextField source="id" /> */}
        <TextField source="title" />
        {/* <ReferenceField source="userId" reference="users" link="show" /> */}
        <EditButton />
      </Datagrid>
    </List>
  );
}

export default PostList;
