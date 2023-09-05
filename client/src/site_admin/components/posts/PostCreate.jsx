import {
  Edit,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
  BooleanInput,
} from "react-admin";
import { RichTextInput, DefaultEditorOptions } from "ra-input-rich-text";
import PostForm from "./PostForm";

function PostCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" className="form" />
        {/* <ReferenceInput source="userId" reference="users" /> */}
        <RichTextInput
          source="content.richText"
          editorOptions={DefaultEditorOptions}
          className="form"
        />
        {/* <TextInput source="content" multiline rows={5} /> */}
        <BooleanInput source="published" lable="Publish" />
      </SimpleForm>
    </Create>
  );
}

export default PostCreate;

// TODO
// Make sure if published=true, also sends the current date as publishDate...
