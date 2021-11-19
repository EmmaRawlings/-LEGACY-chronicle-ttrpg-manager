import dynamic from 'next/dynamic';
import * as React from 'react';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import { TuiViewer } from './TuiViewerWrapper';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

/**
  Possesses all the same properties as Toast Ui Viewer (wrapper).

  Sourced from: https://myeongjae.kim/blog/2020/04/05/tui-editor-with-nextjs
*/

const Viewer = dynamic<TuiViewer>(() => import('./TuiViewerWrapper'), { ssr: false });

const WysiwygViewer: React.FC<ViewerProps> = (props: ViewerProps) => {

  return <div>
    <Viewer
      // previewStyle={"vertical"}
      // height={"600px"}
      // usageStatistics={false}
      theme="dark"
      {...props}
    />
  </div>;
};

export default WysiwygViewer;