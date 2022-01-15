let movies_div = document.getElementById("movies");
let letest_Alphabet; //(married with line -70 clearTimeout )

// 1.gettting data from url------------------------------------------------>
async function searchMovie() {
  try {
    let movie = document.getElementById("movie").value;
    if (movie.length <= 1) {     //function searchMovie() is only shows the result after typing of 2 words
      return false;
    }
     
    let responce = await fetch(`http://www.omdbapi.com/?apikey=55a53429&s=${movie}`);
    let data = await responce.json(); //collect the data from API(Balti laga do)

    console.log("data:", data);
   
    
    let movies_arr = data.Search; //getting data from API
    appendMovies(movies_arr); //calling appendMovies function and passing movies_arr
  } catch (err) {
    console.log("err:", err);
  }
}

// 2.display movies below the search bar when we type for movie name------------------------->  
function appendMovies(movies) {
  movies_div.innerHTML = null;

  if (movies === undefined) {
    //when result is not found it will show false in console.
    return false;
  }
  movies.forEach(function (ele) {
    
    var innerbox=document.createElement("div");
    innerbox.setAttribute("id","innerbox");
    
    let p = document.createElement("p");
    p.innerText = ele.Title;
    p.setAttribute("id","movie_name")
   
    let img =document.createElement("img");
    img.src=ele.Poster;
    img.setAttribute("id","img")

// 3.appendding search box elements---------------------------------------------------->
    innerbox.append(p,img)
    movies_div.append(innerbox);


// 4.When We Click On Movie Name It will show full movie data--------------------------->
  innerbox.addEventListener("click",deTails);
    function deTails(){
      var arr=[];
        let movieId=ele.imdbID;
        

        async function getMovie() {
          let url=(`http://www.omdbapi.com/?apikey=55a53429&i=${movieId}`);
          let response = await fetch(url);
          let data2= await response.json();
         
          arr.push(data2);
          appendMovie(arr)
          console.log("data2:",arr)

        }
     
      getMovie();

//  5.APPENDIN => all details about movie dispaly here ---------------------------------------------------------->     
var container = document.getElementById("container");
    function appendMovie(movie) {
       
      container.innerHTML="";    //----------->for 1 time one movie information
    movie.forEach(function (element) {
      
      let div = document.createElement("div");
      div.setAttribute("id","div")
      let div2 = document.createElement("div");
      div2.setAttribute("id","div2")

      let img = document.createElement("img");
      img.src=element.Poster;
      img.setAttribute("id","poster")

      let title = document.createElement("h1");
      title.innerText = `Title - ${element.Title}`;
      title.setAttribute("id","title")

      let Year = document.createElement("h2");
      Year.innerText = `Year - ${element.Year}`;
      Year.setAttribute("id","year")

      let actor = document.createElement("h3");
      actor.innerText = `Cast - ${element.Actors}`;
      actor.setAttribute("id","actor")

      let Director = document.createElement("h5");
      Director.innerText = `Director - ${element.Director}`;
      Director.setAttribute("id","Director")

      let rating = document.createElement("h5");
      rating.innerText = `Rating - ${element.Ratings[0].Value}`;
      rating.setAttribute("id","rating")


    
        container.appendChild(div);
      div.append(img,div2 );
      div2.append(title, Year, actor, Director,rating);
     
  // }
    });
  }
    }
   
    
  });
}


// Debouncing-(ducking unnecessary call)------------------------------------------>
function debounce(func, delay) {
  //married with line 21
  if (letest_Alphabet) {
    clearTimeout(letest_Alphabet); //if we are searching for "Avengers" then we type spelling 1 by 1 that type API should call only letest Word & delete previous API call
  } 

  letest_Alphabet = setTimeout(function () {
    func();
  }, delay);
}
bn 