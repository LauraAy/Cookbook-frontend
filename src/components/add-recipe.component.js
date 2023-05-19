import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service.js";
import RegionDataService from "../services/region.service.js"
import CreatorDataService from "../services/creator.service"
import AuthService from "../services/auth.service.js";

export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle =this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeRecipeType = this.onChangeRecipeType.bind(this);
        this.onChangeServingSize = this.onChangeServingSize.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.onChangeRegionName = this.onChangeRegionName.bind(this);
        this.onChangeCreatorName = this.onChangeCreatorName.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.addUserId  = this.addUserId.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.saveRegion = this.saveRegion.bind(this);
        this.saveCreator = this.saveCreator.bind(this);
        this.newRecipe = this.newRecipe.bind(this);
       
        this.state = {
            id: null,
            title: "",
            description: "",
            recipeType: "",
            servingSize: null,
            ingredients: "",
            directions: "",
            published: false,
            userId: null,
            regionId: null,
            creatorId: null,
            submitted: false,
            currentUser: { username: "" },
            regionName: "",
            creatorName: "", 
            about: "",
            link: "",
            regions: []

        };
    }

    addUserId() {
      const currentUser = AuthService.getCurrentUser();

      this.setState({
        userId: currentUser.id
      });
    
      console.log(currentUser.id)
    }

    componentDidMount() {
      this.addUserId()
      const currentUser = AuthService.getCurrentUser();
      this.setState({ currentUser: currentUser})

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
 
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    onChangeRecipeType(e) {
      this.setState({
        recipeType: e.target.value
      });
    }

    onChangeServingSize(e) {
      this.setState({
        servingSize: e.target.value
      });
    }

    onChangeIngredients(e) {
      this.setState({
        ingredients: e.target.value
      });
    }

    onChangeDirections(e) {
      this.setState({
        directions: e.target.value
      });
    }

    onChangeRegionName(e) {
      this.setState({
        regionName: e.target.value
      });
    }

    onChangeCreatorName(e) {
      this.setState({
        creatorName: e.target.value
      });
    }

    onChangeAbout(e) {
      this.setState({
        about: e.target.value
      });
    }

    onChangeLink(e) {
      this.setState({
        link: e.target.value
      });
    }

    saveRecipe() {
      
      var data ={
            title: this.state.title,
            description: this.state.description,
            recipeType: this.state.recipeType,
            servingSize: this.state.servingSize,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            userId: this.state.userId,
            regionId: this.state.region.regionId,

        };
   
    RecipeDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                recipeType: response.data.recipeType,
                servingSize: response.data.servingSize,
                ingredients: response.data.ingredients,
                directions: response.data.directions,
                published: response.data.published,
                userId: response.data.userId,
                regionId: response.data.regionId,
                creatorId: response.data.creatorId,
                submitted: true
            });
            console.log(response.data);
            console.log(this.state.id)
        })
        .catch(e => {
            console.log(e.response);
        });
    }

    saveRegion() {
      var data ={  
       regionId: this.state.regionId, 
       regionName: this.state.regionName
    };
    
    RegionDataService.create(data)
      .then(response => {
        this.setState({
          regionId: response.data.id,
          regionName: response.data.regionName, 
          region: response.data
        });
        console.log(response.data);
        console.log(response.data.id);
        console.log(this.state.regionId);
        console.log (this.state.regionName);
      })
    }
      
    saveCreator() {
      var data ={
       creatorName: this.state.creatorName,
       about: this.state.about,
       link: this.state.link
    };

    CreatorDataService.create(data)
      .then(response => {
        this.setState({
          creatorId: response.data.id,
          creatorName: response.data.creatorName,
          about: response.data.about,
          link: response.data.link
        });
        console.log(response.data);
      
      })
    }

    newRecipe() {
        this.setState({
            id: null,
            regionId: null,
            creatorId: null,
            title: "",
            description: "",
            recipeType: "",
            servingSize: null,
            ingredients: "",
            directions: "",
            published: false, 
            submitted: false,
        });
    }


    render() {
      const { currentUser } = this.state;
        return (
          <div>
            <p>
          <strong>User:</strong>{" "}
          {currentUser.username}
        </p>
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Recipe submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newRecipe}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeType">Recipe Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeType"
                    required
                    value={this.state.recipeType}
                    onChange={this.onChangeRecipeType}
                    name="recipeType"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="servingSize">Serving Size</label>
                  <input
                    type="integer"
                    className="form-control"
                    id="servingSize"
                    required
                    value={this.state.servingSize}
                    onChange={this.onChangeServingSize}
                    name="servingSize"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredients"
                    required
                    value={this.state.ingredients}
                    onChange={this.onChangeIngredients}
                    name="ingredients"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="directions">Directions</label>
                  <input
                    type="text"
                    className="form-control"
                    id="directions"
                    required
                    value={this.state.directions}
                    onChange={this.onChangeDirections}
                    name="directions"
                  />
                </div>

                <h4>Add a Region</h4>

                <div className="form-group">
                  <label htmlFor="regionName">Region Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="regionName"
                    required
                    value={this.state.regionName}
                    onChange={this.onChangeRegionName}
                    name="regionName"
                  />
                </div>
                <button onClick={this.saveRegion} className="btn btn-success">
                  Add Region
                </button>
                <br></br>
                <br></br>
               
               <h4>Add a Recipe Creator</h4>

                <div className="form-group">
                  <label htmlFor="creatorName">Recipe Creator Name</label>
                  <input
                  type="text"
                  className="form-control"
                  id="creatorName"
                  required
                  value={this.state.creatorName}
                  onChange={this.onChangeCreatorName}
                  name="creatorName"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="about">About Recipe Creator</label>
                  <input
                  type="text"
                  className="form-control"
                  id="about"
                  required
                  value={this.state.about}
                  onChange={this.onChangeAbout}
                  name="about"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="linnk">Recipe Creator Link</label>
                  <input
                  type="text"
                  className="form-control"
                  id="link"
                  required
                  value={this.state.link}
                  onChange={this.onChangeLink}
                  name="link"
                  />
                </div>

                <button onClick={this.saveCreator} className="btn btn-success">
                  Add Creator
                </button>
                <br></br>
                <br></br>
                <button onClick={this.saveRecipe} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
          </div>
        );
      }
    }