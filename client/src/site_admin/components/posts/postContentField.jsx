import { useRecordContext, RichTextField } from "react-admin";

function PostContentField({ source }) {
  const record = useRecordContext();

  let hasRichText;
  if (record.content.richText) {
    hasRichText = true;
  } else {
    hasRichText = false;
  }

  return (
    record &&
    (hasRichText ? (
      <RichTextField source="content.richText" label="Content" />
    ) : (
      record.content.plain && (
        <span>
          {record[source].plain.map((paragraph, index) => {
            return (
              <span key={index}>
                <p className="MuiTypography-root MuiTypography-body2 css-e784if-MuiTypography-root">
                  {paragraph}
                </p>
                <br />
              </span>
            );
          })}
        </span>
      )
    ))
  );
}

export default PostContentField;
