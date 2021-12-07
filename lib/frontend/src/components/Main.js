import { useEffect, useState } from "react";

//import components
import Header from "./Header";
import Card from "./Card";
import LineChart from "./LineChart";

//import icons
import foodIcon from "../assets/foodIcon.jpg";
import timeIcon from "../assets/timeIcon.jpg";
import activityIcon from "../assets/activityIcon.jpg";
import tipsIcon from "../assets/tipsIcon.jpg";
import sportIcon from "../assets/sportIcon.png";

export default function Main() {
  //to generate a random quote
  const [randomQuote, setRandomQuote] = useState({});

  //to generate an aleatory number of hours of sleep, creation of our own API
  const [time2Bed, setTime2Bed] = useState("");

  //to generate a random recipe
  const [randomRecipe, setRandomRecipe] = useState({});

  //to generate a random sport
  const [randomSport, setRandomSport] = useState({});

  useEffect(() => {
    //API for random quotes
    const fetchRandomQuote = async () => {
      const res = await fetch(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random"
      );
      const data = await res.json();
      const newRandomQuote = {
        quoteAuthor: data.data[0].quoteAuthor,
        quoteGenre: data.data[0].quoteGenre,
        quoteText: data.data[0].quoteText,
      };
      setRandomQuote(newRandomQuote);
    };

    //API for time to bed, our own API
    const fetchTime2Bed = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/time2bed");
        if (!res) return;
        const data = await res.json();
        setTime2Bed(data);
      } catch (error) {
        console.error(error);
      }
    };

    //API for food suggestion
    const fetchRandomRecipe = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const datas = await res.json();
      const newRandomRecipe = {
        recipeTitle: datas.meals[0].strMeal,
        recipePic: datas.meals[0].strMealThumb,
        recipeWebsite: datas.meals[0].strSource,
      };
      setRandomRecipe(newRandomRecipe);
    };

    //API for sport details
    const fetchRandomSport = async () => {
      const idSport = [
        1, 4, 5, 960, 12, 19, 20, 23, 29, 36, 37, 38, 39, 40, 44, 45, 46, 49,
        51, 57, 58, 66, 67, 68, 69, 70, 73, 74, 76, 78, 81, 82, 83, 86, 87, 89,
        90, 91, 93, 95, 96, 98, 100, 101, 103, 105, 106, 109,
      ];
      const len = idSport.length - 1;
      console.log(len);
      const rg = Math.floor(Math.random() * (len - 1 + 1)) + 1;
      const number = idSport[rg];
      const res = await fetch(`
        https://sports.api.decathlon.com/sports/${number}`);
      const data = await res.json();
      console.log(data.data);
      const newRandomSport = {
        sportName: data.data?.attributes?.name,
        sportDescription: data.data?.attributes?.description,
        sportPic:
          data.data?.relationships?.images?.data[0]?.variants[0].thumbnail.url,
        sportIcon: data.data?.attributes?.icon,
      };
      setRandomSport(newRandomSport);
    };

    fetchTime2Bed();
    fetchRandomQuote();
    fetchRandomRecipe();
    fetchRandomSport();
  }, []);

  return (
    <div className="main">
      <div className="up">
        <Header />
      </div>
      {/* frame in which we have all widgets */}
      <div className="widgets">
        {/* group of three little widgets */}
        <div className="group1">
          {/* widget food suggestion */}
          <Card
            icone={foodIcon}
            alt="food icon"
            titre="Food Suggestions"
            alternative="food icon"
          >
            <p className="data">Today we suggest the recipe for: </p>
            <p className="impData">
              {randomRecipe?.recipeTitle && randomRecipe.recipeTitle}
            </p>
            <div className="food">
              <img
                className="imageFood"
                src={randomRecipe?.recipePic && randomRecipe.recipePic}
                width="150px"
                alt="food"
              />
              {/* Boutton to go on the website of the sollowing food */}
              <div className="clickBut">
                <a
                  href={
                    randomRecipe.recipeWebsite ? randomRecipe.recipeWebsite : ""
                  }
                  target="_blank"
                >
                  <button className="button">See the recipe</button>
                </a>
              </div>
            </div>
          </Card>

          {/* widget discover sports */}
          <Card
            icone={sportIcon}
            alternative="sport icon"
            titre="Discover sports"
          >
            <p className="impData">
              {randomSport?.sportName && randomSport.sportName}{" "}
            </p>
            <p className="food">
              {" "}
              {randomSport?.sportDescription &&
                randomSport.sportDescription}{" "}
            </p>

            <div className="food">
              {(randomSport.sportPic || randomSport.sportIcon) && (
                <img
                  className="imageFood"
                  src={
                    randomSport.sportPic
                      ? randomSport.sportPic
                      : randomSport.sportIcon && randomSport.sportIcon
                  }
                  width="150"
                  height="150"
                />
              )}
            </div>
          </Card>

          {/* widget time in bed */}

          <Card icone={timeIcon} alternative="time icon" titre="Time in Bed">
            <p className="food">This night, you spent</p>
            <p className="impData2"> {time2Bed?.today?.sleep_time}</p>
            <p className="food">hours in bed.</p>
            <p className="food1">
              Your sleep quality is{" "}
              <span className="impData">{time2Bed?.today?.sleep_quality}</span>
            </p>
            <p className="food1">This week, you spent in average </p>
            <p className="food1">
              <span className="impData"> {time2Bed?.avg} </span>
              hours per night sleeping.
            </p>
          </Card>

          <div className="tips">
            {/* tips and motivation */}
            <Card
              icone={tipsIcon}
              alternative="tips icon"
              titre="Tips and Motivation"
            >
              <blockquote className="data">
                {randomQuote?.quoteText && randomQuote.quoteText}{" "}
                <i>
                  {randomQuote?.quoteAuthor && randomQuote.quoteAuthor}
                  <br />
                  {randomQuote?.quoteGenre && randomQuote.quoteGenre}
                </i>
              </blockquote>
            </Card>
          </div>
        </div>

        {/* group de of two big widgets, tips and activity */}
        <div className="group2">
          {/* Activity growth */}
          <Card
            icone={activityIcon}
            alternative="activity icon"
            titre="Activity Growth"
          >
            {/* Activity chart  */}
            <div className="chart">
              <LineChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
