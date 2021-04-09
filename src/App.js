import React,{useEffect,useState} from "react";
import Recipe from './Recipes'; 
import './App.css';


const App=() =>{
  const APP_ID="aa599880";
  const APP_KEY="1d2356830c8a956993e54d26732c660b";
 
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const[query,setQuery]=useState('chicken');
  useEffect(()=>
    {
      getRecipes();

    },[query]);
  

  const getRecipes= async()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateSearch=e=>{
    setSearch(e.target.value);
    console.log(search);
  }

  return(
    <div className="App">
      <div className="nav-bar-recipes">
        <div id="content">Recipe App Food</div>
      </div>
        <div>
           <form onSubmit={getSearch} className="search-form" >
              <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Ingrese una receta"/>
              <button type="submit" className="search-button">
                Buscar
                </button>
            </form>
        </div>
        
      <div className="recipes">
      {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}

      </div>
      
    </div>
  )

}

export default App;
