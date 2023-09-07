import React, { useState, useEffect } from "react";
import RecipesAll from "../components/recipesAll.component.js";
import RegionRecipesAll from "../components/regionRecipesAll.component.js"
import CreatorRecipesAll from "../components/creatorRecipesAll.component.js"
import { Button } from '@mui/material';

const RecipesAllPage = ({clickTest}) => { 
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

	const testFunction = () => {
		console.log("what ho!")
	}

  return (
	<>
	
    <div>
			{ allView && (
			<>
				<div>
					<RecipesAll  clickRegion={goRegionView} clickCreator={goCreatorView} />
				</div>
			</>
			)}
    </div>
		<div>
			{ regionView && (
				<div>
					<RegionRecipesAll clickTitle={goRecipeView} clickCreator={goCreatorView}/>
				</div>
			)}
		</div>
		<div>
			{ creatorView && (
				<div>
					<CreatorRecipesAll clickTitle={goRecipeView} clickRegion={goRegionView}/>
				</div>
			)}
		</div>
	</>
  )
}
    
export default RecipesAllPage