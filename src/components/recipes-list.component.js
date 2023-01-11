import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";

export default class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveRecipes = this.retrieveRecipes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRecipe = this.setActiveRecipe.bind(this);
        this.removeAllRecipes = this.removeAllRecipes.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state= {
            recipes: [],
            currentRecipe: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveRecipes();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveRecipes() {
        RecipeDataService.getAll()
        .then(response => {
            this.setState({
            recipes: response.data
        });
        console.log(response.data)
    })
    .catch(e => {
        console.log(e);
    });
}

refreshList() {
    this.retrieveRecipes();
    this.setState({
        currentRecipe: null,
        currentIndex: -1
    });
}

setActiveRecipe(recipe, index) {
    this.setState({
        currentRecipe: recipe,
        currentIndex: index
    });
}

removeAllRecipes() {
    RecipeDataService.deleteAll()
    .then(response => {
        console.log(response.data);
        this.refreshList();
    })
    .catch(e => {
        console.log(e);
    });
}

searchTitle() {
    RecipeDataService.findByTitle(this.state.searchTitle)
    .then(response => {
        this.setState({
            tutorials: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
}

render() {
    const {searchTitle, recipes, currentRecipe, currentIndex } = this

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchTitle}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Recipes List</h4>
                <ul className="list-group">
                    {recipes &&
                        recipes.map((recipe, index) =>(
                            <li
                            className={
                                "list-group-item" +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveRecipe(recipe, index)}
                            key={index}
                        >
                        {recipe.title}
                        </li>
                        ))}
                </ul>

                <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllRecipes}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md 6">
                {currentRecipe ? (
                    <div>
                        <h4>Recipe</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentRecipe.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentRecipe.description}
                        </div>
                        <div> 
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentRecipe.published ? "Published" : "Pending"}
                        </div>

                        <Link   
                        to={"/recipes/"+ currentRecipe.id}
                        className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Recipe...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
}