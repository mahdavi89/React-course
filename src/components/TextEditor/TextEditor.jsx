import React, { useState } from "react";
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles } from "@material-ui/core";
import {grey} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  editor:{
    border: '1px solid rgb(215, 215, 215)',
    width:'100%'
    
  },
  rdw :{
    padding: '0 20px 10px',
  },
  toolbarClass:{
    backgroundColor:grey[300],
    
  }
  }));




const TextEditor = React.forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const classes = useStyles();
  const onEditorStateChange = editorState => {
    setEditorState(editorState);



    const content =editorState.getCurrentContent();
    const isEditorEmpty = !content.hasText();
    const currentPlainText = content.getPlainText()
    const lengthOfTrimmedContent = currentPlainText.trim().length;
    const isContain = (!!(!isEditorEmpty && lengthOfTrimmedContent));
    
    console.log('props',props)
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
      
    );
  };

  return (
    <React.Fragment>
      <div className={classes.editor}>
        <Editor
          editorStyle={{paddingInlineStart:'10px'}}
          ref={ref}
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
          toolbarClassName={classes.toolbarClass}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    </React.Fragment>
  );
});

export default TextEditor;
