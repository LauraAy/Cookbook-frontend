import * as React from 'react';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import RecipesAllPage from '../pages/recipesAll.page';

const Test = ({clickTest}) => {

  return (
    <Button onClick={() => clickTest()}>Test</Button>

  )
}

export default Test;