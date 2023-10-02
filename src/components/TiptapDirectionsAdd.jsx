import '../styles.scss'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import React from 'react'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { FormatBoldOutlined, FormatItalicOutlined, FormatUnderlinedOutlined, StrikethroughSOutlined,
	FormatListBulletedOutlined, FormatListNumberedOutlined, HorizontalRuleOutlined, TitleOutlined,
  UndoOutlined, RedoOutlined} from '@mui/icons-material'
import { Box} from '@mui/material';
import MenuBar from './TiptapMenuBar'
import extensions from './TiptapExtensions'

< extensions/>

const content = ''

const TiptapIngredientsAdd = ({setDirections}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDirections(html);
      console.log(html);
    }
  })

  return (
  <>
    <Box sx={{ border: 1, borderColor: 'rgb(196, 196, 196)', borderRadius: '5px'}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </Box>
  </>
  )
}


export default TiptapIngredientsAdd