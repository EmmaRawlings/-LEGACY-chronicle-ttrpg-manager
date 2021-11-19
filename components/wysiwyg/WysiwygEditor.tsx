import dynamic from 'next/dynamic';
import * as React from 'react';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
//import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

/**
  Possesses all the same properties as Toast Ui Editor (wrapper), plus `onChange={(value) => console.log(value)}`.

  Sourced from: https://myeongjae.kim/blog/2020/04/05/tui-editor-with-nextjs
*/

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(() => import("./TuiEditorWrapper"), { ssr: false });
const EditorWithForwardedRef = React.forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

interface Props extends EditorProps {
  onChange(value: string): void;

  valueType?: "markdown" | "html";
}

const WysiwygEditor: React.FC<Props> = React.forwardRef<EditorType>((props: Props, ref) => {
  // const { initialValue, previewStyle, height, initialEditType, useCommandShortcut } = props;

  const editorRef = ref === undefined ? React.useRef<EditorType>() : ref;
  const handleChange = React.useCallback(() => {
    if (!editorRef.current || props.onChange === undefined) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || "markdown";

    props.onChange(valueType === "markdown" ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef]);

  return <div>
    <EditorWithForwardedRef
      // {...props}
      // initialValue={initialValue || "hello react editor world!"}
      // previewStyle={previewStyle || "vertical"}
      // height={height || "600px"}
      // initialEditType={initialEditType || "wysiwyg"}
      // useCommandShortcut={useCommandShortcut || true}
      initialValue={"hello react editor world!"}
      previewStyle={"vertical"}
      height={"600px"}
      initialEditType={"wysiwyg"}
      useCommandShortcut={true}
      ref={editorRef}
      onChange={handleChange}
      usageStatistics={false}
      autofocus={false}
      theme="dark"
      {...props}
    />
  </div>;
});

export default WysiwygEditor;