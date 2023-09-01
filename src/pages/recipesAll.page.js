import React, { useState, useEffect } from "react";
import RecipesAll from "../components/recipesAll.component.js";
import RegionRecipesAll from "../components/regionRecipesAll.component.js"
import CreatorRecipesAll from "../components/creatorRecipesAll.component.js"
import { Button } from '@mui/material';

const RecipesAllPage = () => { 
	const [allView, setAllView] = useState(true)
	const [regionView, setRegionView] = useState(false)
	const [creatorView, setCreatorView] = useState(false)

	const goRecipeView = () => {
		console.log("hi recipe")
		if ( allView === false ) {
			setAllView(true)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
	}
	
	const goRegionView = () => {
		console.log("hi region")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === false ) {
			setRegionView(true)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
	}

	const goCreatorView = () => {
		console.log("hi creator")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === false) {
			setCreatorView(true)
		}
	}

  return (
	<>
    <div>
			{ allView && (
				<div>
					<RecipesAll />
					<Button onClick={goRegionView}>filter by region</Button>
					<Button onClick={goCreatorView}>filter by creator</Button>
					
				</div>	
			)}
    </div>
		<div>
			{ regionView && (
			<div>	
				<div>
					<RegionRecipesAll />
				</div>
				<Button onClick={goRecipeView}>filter by recipe title</Button>
				<Button onClick={goCreatorView}>filter by creator</Button>
			</div>
			)}
		</div>
		<div>
			{ creatorView && (
			<div>
				<div>
					<CreatorRecipesAll />
				</div>
				<Button onClick={goRecipeView}>filter by recipe title</Button>
				<Button onClick={goRegionView}>filter by region</Button>
			</div>
			)}
		</div>
	</>
  )
}
    
export default RecipesAllPage