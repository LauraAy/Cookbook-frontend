import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import PairingDataService from "../services/pairing.service";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import { useParams, useNavigate } from 'react-router-dom';

const PairingAddComponent = () => { 
	const { id } = useParams();
	let navigate = useNavigate();

  const initialPairingState = {
		id: null,
		pairingName: "",
		description: "",
		drinks: "",
		shows: "",
		books: "",
		music: "",
		decor: "",
		more: "",
		recipeOne:"",
		recipeTwo:"",
		recipeThree:""
  };

  const [pairings, setPairings] = useState ([]);  
  const [pairing, setPairing] = useState(initialPairingState);
  const [currentPairing, setCurrentPairing] = useState(initialPairingState)
  const [currentPairingId, setCurrentPairingId] = useState()
  const [recipes, setRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState ([]);
	const [selectedRecipeOneId, setSelectedRecipeOneId] = useState ()
	const [selectedRecipeTwoId, setSelectedRecipeTwoId] = useState ()
	const [selectedRecipeThreeId, setSelectedRecipeThreeId] = useState ()
	const [selectedRecipeOne, setSelectedRecipeOne] = useState ([])
	const [selectedRecipeTwo, setSelectedRecipeTwo] = useState ([])
	const [selectedRecipeThree, setSelectedRecipeThree] = useState ([])
  const [selected, setSelected] = useState (false)
  const [submitted, setSubmitted] = useState(false);
  const [added, setAdded] = useState(false);
  const [createNew, setCreateNew] = useState(false)
  
  //retrieve recipe and pairings
  useEffect(() => {
		retrievePairings();
		retrieveRecipe(id);
		retrieveRecipes();
  }, []);


  const retrieveRecipe = id => {
	RecipeDataService.get(id)
	.then(response => {
		setCurrentRecipe(response.data);
		console.log(response.data);
	})
	.catch(e => {  
		console.log(e) 
	});
  };

  const retrievePairings = () => {
	PairingDataService.getAll()
	.then(response => {
		setPairings(response.data);
		console.log(response.data);
	})
	.catch(e => {
		console.log(e);
	});
  };

	const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
      setRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

	//form input to create pairing
  const handleInputChange = event => {
	const { name, value } = event.target;
	setPairing({ ...pairing, [name]: value });
  };

	 //retrieve first selectedRecipe from id based on dropdown selection
	 const retrieveSelectedRecipeOne = id => {
		RecipeDataService.get(id)
		.then(response => {
			setSelectedRecipeOne(response.data);
			console.log(response.data);
		})
		.catch(e => {   
			console.log(e)
		});
	};

	//retrieve first recipeId from dropdown selection and run retrieveRecipe function
	const handleSelectedRecipeOneChange = async (event) => {
		setSelectedRecipeOneId(event.target.value);
		// setSelected(true);
		console.log(selectedRecipeOneId)
	}

	useEffect(()=>{
		retrieveSelectedRecipeOne(selectedRecipeOneId)
		console.log(selectedRecipeOne)
	}, [selectedRecipeOneId])


		 //retrieve second selectedRecipe from id based on dropdown selection
		 const retrieveSelectedRecipeTwo = id => {
			RecipeDataService.get(id)
			.then(response => {
				setSelectedRecipeTwo(response.data);
				console.log(response.data);
			})
			.catch(e => {   
				console.log(e)
			});
		};

	const handleSelectedRecipeTwoChange = async (event) => {
		setSelectedRecipeTwoId(event.target.value);
		// setSelected(true);
		console.log(selectedRecipeTwoId)
	}

	useEffect(()=>{
		retrieveSelectedRecipeTwo(selectedRecipeTwoId)
		console.log(selectedRecipeTwo)
	}, [selectedRecipeTwoId])

		 //retrieve third selectedRecipe from id based on dropdown selection
		 const retrieveSelectedRecipeThree = id => {
			RecipeDataService.get(id)
			.then(response => {
				setSelectedRecipeThree(response.data);
				console.log(response.data);
			})
			.catch(e => {   
				console.log(e)
			});
		};

	const handleSelectedRecipeThreeChange = async (event) => {
		setSelectedRecipeThreeId(event.target.value);
		// setSelected(true);
		console.log(selectedRecipeThreeId)
	}

	useEffect(()=>{
		retrieveSelectedRecipeThree(selectedRecipeThreeId)
		console.log(selectedRecipeTwo)
	}, [selectedRecipeTwoId])

  //save pairing from form
  const savePairing = () => {
		// console.log(selectedRecipe.id)
	var data = {
		pairingName: pairing.pairingName,
		description: pairing.description,
		drinks: pairing.drinks,
		shows: pairing.shows,
		books: pairing.books,
		music: pairing.music,
		decor: pairing.decor,
		more: pairing.more,
		recipeOne: selectedRecipeOne.id,
		recipeTwo: selectedRecipeTwo.id,
		recipeThree: selectedRecipeThree.id
	};

	PairingDataService.create(data)
	.then(response => {
		setPairing({
			id: response.data.id,
			pairingName: response.data.pairingName,
			description: response.data.description,
			drinks: response.data.drinks,
			shows: response.data.shows,
			books: response.data.books,
			music: response.data.music,
			decor: response.data.decor,
			more: response.data.more,
			recipeOne: response.data.recipeOne
		});
		setSubmitted(true);
		console.log(response.data);
	})
	.catch(e => {
		console.log(e);
	});
  };

  //attach pairing created from form to recipe
  const savePairingRecipe = () => {
	const data = {
		pairingId: pairing.id
	}

  RecipeDataService.update(currentRecipe.id, data)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + currentRecipe.id)
      })
      .catch(e => {
        console.log(e);
      });
  }

  //retrieve currentPairing from id based on dropdown selection
  const retrieveCurrentPairing = id => {
	PairingDataService.get(id)
	.then(response => {
		setCurrentPairing(response.data);
		console.log(response.data);
	})
	.catch(e => {   
		console.log(e)
	});
  };

  //retrieve pairingId from dropdown selection and run retrievePairing function
  const handlePairingChange = async (event) => {
	setCurrentPairingId(event.target.value);
	setSelected(true);
	console.log(currentPairingId)
  }
  useEffect(()=>{
	console.log(currentPairingId)
	retrieveCurrentPairing(currentPairingId)
  }, [currentPairingId])

  //attach pairing selected from dropdown to recipe
  const savePairingRecipeDropdown = () => {
	const data = {
		pairingId: currentPairing.id
	}

	RecipeDataService.update(currentRecipe.id, data)
	.then(response => {
		console.log(response.data);
		navigate("/recipes/" + currentRecipe.id)
	})
	.catch(e => {
		console.log(e);
	});
  }

	//  //retrieve currentRecipe from id based on dropdown selection
	//  const retrieveSelectedRecipe = id => {
	// 	RecipeDataService.get(id)
	// 	.then(response => {
	// 		setSelectedRecipe(response.data);
	// 		console.log(response.data);
	// 	})
	// 	.catch(e => {   
	// 		console.log(e)
	// 	});
	// };

  //create new pairing set to true
  const goCreate = () => {
		setCreateNew(true)
  }
  
  //Reset form for new pairing
  const newPairing = () => {
		setPairing(initialPairingState);
		setCurrentPairing(initialPairingState);
		setCreateNew(false);
		setSelected(false);
		setAdded(false);
		setSubmitted(false);
  };

  //navigate to recipe page
  const returnRecipe = () => {
		navigate("/recipes/" + id)
  }

  //switch to add a new pairing
  const addAnotherPairing = () => {
		newPairing()
  }

  //navigate to add a new region
  const addRegion = () => {
		navigate("/regions/add/:id")
  }

  //navigate to add a new creator
  const addCreator = () => {
		navigate("/creators/add/:id")
  }

	return(
		<div>
			{ added ? (
				<div>
					<h4>You've added {pairing.creatorName} to {currentRecipe.title}</h4>
					<br></br>
					<br></br>
					<button onClick={returnRecipe}>View Recipe Page</button>
					<br></br>
					<br></br>
					<button onClick={addAnotherPairing}>Add Another Pairing</button>
					<button onClick={addRegion}>Add a Region</button>
					<button onClick={addCreator}>Add a Recipe Creator</button>
				</div>
			):(
				<div>
					{ createNew ? (
						<div className="submit-form">
							{submitted ? (
								<div>
									<h2>Success!</h2>
									<div>
										<h4>{pairing.pairingName}</h4>
									</div>
									<button onClick={savePairingRecipe}>Add this recipe pairing to {currentRecipe.title}.</button>
								</div>
							):(
							<div>
								<h1>Create a new pairing for {currentRecipe.title}</h1>
								<div>
								<div className="form-group">
									<label htmlFor="pairingName">Recipe Pairing Name</label>
									<input
										type="text"
										className="form-control"
										id="pairingName"
										required 
										value={pairing.pairingName}
										onChange={handleInputChange}
										name="pairingName"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="description">Pairing Description</label>
									<input
										type="text"
										className="form-control"
										id="description"
										required
										value={pairing.description}
										onChange={handleInputChange}
										name="description"
									/>
								</div> 
								<div className="form-group">
									<label htmlFor="drinks">Drinks</label>
									<input
										type="text"
										className="form-control"
										id="drinks"
										required
										value={pairing.drinks}
										onChange={handleInputChange}
										name="drinks"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="shows">TV Shows or Movies</label>
									<input
										type="text"
										className="form-control"
										id="shows"
										required
										value={pairing.shows}
										onChange={handleInputChange}
										name="shows"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="books">Books</label>
									<input
										type="text"
										className="form-control"
										id="books"
										required
										value={pairing.books}
										onChange={handleInputChange}
										name="books"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="music">Music</label>
									<input
										type="text"
										className="form-control"
										id="music"
										required
										value={pairing.music}
										onChange={handleInputChange}
										name="music"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="decor">Decor</label>
									<input
										type="text"
										className="form-control"
										id="decor"
										required
										value={pairing.decor}
										onChange={handleInputChange}
										name="decor"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="more">More</label>
									<input
										type="text"
										className="form-control"
										id="more"
										required
										value={pairing.more}
										onChange={handleInputChange}
										name="more"
									/>
								</div>
							</div>
							<br></br>
							<br></br>
							<p>Please select a Recipe from the dropdown.</p> 
              <Form>
                <select class="form-control" onChange={handleSelectedRecipeOneChange} >
                  <option>Select a Recipe</option>
                  {recipes.map((recipes, index) => 
                    <option
                      value= {recipes.id}
                      key={index}
                    >
											{recipes.title}
                    </option>
                  )}
                </select>
              </Form>
							<br></br>
							<br></br>
							<p>Please select a Recipe from the dropdown.</p> 
							<Form>
                <select class="form-control" onChange={handleSelectedRecipeTwoChange} >
                  <option>Select a Recipe</option>
                  {recipes.map((recipes, index) => 
                    <option
                      value= {recipes.id}
                      key={index}
                    >
											{recipes.title}
                    </option>
                  )}
                </select>
              </Form>
							<br></br>
							<br></br>
							<p>Please select a Recipe from the dropdown.</p> 
							<Form>
                <select class="form-control" onChange={handleSelectedRecipeThreeChange} >
                  <option>Select a Recipe</option>
                  {recipes.map((recipes, index) => 
                    <option
                      value= {recipes.id}
                      key={index}
                    >
											{recipes.title}
                    </option>
                  )}
                </select>
              </Form>
							<br></br>
							<br></br>
							<button onClick={savePairing} className="btn btn-success">
								Submit
							</button>
						</div>
						)}
					</div>
					):(
						<div>
							{ selected ? (
								<div>
									<h1>{currentPairing.pairingName}</h1>
									<button onClick={savePairingRecipeDropdown}>Add this pairing to recipe</button>
								</div>
							):(
								<div>
									<h1>Attach a pairing to {currentRecipe.title}</h1>
								<div>  
									<p>Please select a pairing from the dropdown.</p> 
									<Form>
										<select class="form-control" onChange={handlePairingChange} >
											<option>Select a pairing</option>
											{pairings.map((pairing, index) => 
												<option
													value= {pairing.id}
													key={index}
												>
													{pairing.pairingName}
												</option>
											)}
										</select>
									</Form>
									<br></br>
									<br></br>
									<p>Or create a new recipe pairing</p>
									<button onClick={goCreate}>Create New Recipe Pairing</button>
								</div>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
  )
}

export default PairingAddComponent;