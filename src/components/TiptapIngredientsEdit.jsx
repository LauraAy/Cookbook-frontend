import '../styles.scss'
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Box} from '@mui/material';
import MenuBar from './TiptapMenuBar'

import RecipeDataService from "../services/recipe.service";



  
// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  }),
  // Placeholder.configure({
  //   placeholder: 'Ingredients',
  // }),
  Underline, 
  TextAlign.configure({
    types: ['heading', 'paragraph'], 
    alignments: ['left', 'right'],
    defaultAlignment: 'left',
  })
]



const TiptapIngredientsEdit = ({setIngredients}) => {
	const { id }= useParams();

	const initialRecipeState = {
    id: null,
    title: "",
    description: "",
    recipeType: "",
    servingSize: null,
    ingredients: "",
    directions: "",
    source: "",
    userId: undefined
  };
  const [inRecipe, setInRecipe] = useState(initialRecipeState);

	 //get recipe
	 const getRecipe = id => {
    RecipeDataService.get(id)
    .then(response => {
      setInRecipe(response.data);
      console.log(response.data.ingredients);
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipe(id);
  }, [id]);

	const editorContent = inRecipe.ingredients

  const editor = useEditor({
    extensions,
    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setIngredients(html);
      console.log(html);
    }
  })

  return (
  <>
    <Box sx={{ mb: "4px", border: 1, borderColor: 'rgb(196, 196, 196)', borderRadius: '5px'}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </Box>
  </>
  )
}

export default TiptapIngredientsEdit