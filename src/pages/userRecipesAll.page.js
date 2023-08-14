import React, { useState } from "react";
import UserRecipesAll from "../components/userRecipesAll.component.js";
import UserRegionRecipesAll from "../components/userRegionRecipesAll.component.js";
import UserCreatorRecipesAll from "../components/userCreatorRecipesAll.component.js";

const UserRecipesPage = () => {
	const [userRecipesView, setUserRecipesView] = useState(true)
	const [userRegionView, setUserRegionView] = useState(false)
  const [userCreatorView, setUserCreatorView] = useState(false)

	const goUserRecipesView = () => {
		console.log("hi recipe")
		if ( userRecipesView === false ) {
			setUserRecipesView(true)
		}
		if ( userRegionView === true ) {
			setUserRegionView(false)
		}
		if ( userCreatorView === true) {
			setUserCreatorView(false)
		}
	}

	const goUserRegionView = () => {
		console.log("hi region")
		if ( userRecipesView === true ) {
			setUserRecipesView(false)
		}
		if ( userRegionView === false ) {
			setUserRegionView(true)
		}
		if ( userCreatorView === true) {
			setUserCreatorView(false)
		}
	}

	const goUserCreatorView = () => {
		console.log("hi creator")
		if ( userRecipesView === true ) {
			setUserRecipesView(false)
		}
		if ( userRegionView === true ) {
			setUserRegionView(false)
		}
		if ( userCreatorView === false) {
			setUserCreatorView(true)
		}
	}
  return (
	<>
    <div>
			{ userRecipesView && (
				<div>
					<UserRecipesAll />
					<button onClick={goUserRegionView}>filter by region</button>
					<button onClick={goUserCreatorView}>filter by creator</button>
				</div>	
			)}
    </div>
		<div>
			{ userRegionView && (
				<div>	
					<UserRegionRecipesAll />
					<button onClick={goUserRecipesView}>filter by recipe title</button>
					<button onClick={goUserCreatorView}>filter by creator</button>
				</div>
			)}
		</div>
		<div>
			{ userCreatorView && (
				<div>	
					<UserCreatorRecipesAll />
					<button onClick={goUserRecipesView}>filter by recipe title</button>
					<button onClick={goUserRegionView}>filter by region</button>
				</div>
			)}
		</div>
	</>
	)
}
    
export default UserRecipesPage