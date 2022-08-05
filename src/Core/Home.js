import React, { useEffect } from "react";
import "../Styles/Home.css";
import Landingscreen from "../Components/Laningscreen";
import Footer from "../Components/Footer";
import Hometext from "../Components/Hometext";
import Hometext2 from "../Components/Hometext2";
import Header from "../Components/Header";
import Categorycards from "../Components/Categorycards";
import Quote from "../Components/Quote";
import Skiing from "../Assets/skiing.jpg";
import BikeTrips from "../Assets/biketrips.jpg";
import Trekking from "../Assets/trekking.jpg";
import Rafting from "../Assets/Rafting.jpg";
import Camping from "../Assets/camping.jpg";
import Rock from "../Assets/rockClimbing.jpg";
import Expedition from "../Assets/expedition.jpg";
import Chardham from "../Assets/chardham.jpg";
import Cycling from "../Assets/cycling.jpg";
import Snowboarding from "../Assets/snowboarding.jpg";
import $ from "jquery";

const Home = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);
  return (
    <div>
      <Landingscreen />
      <Header />
      <Categorycards />
      <Quote />

      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Trekking */}
      <div class="curved-div1">
        <Hometext
          src1={Trekking}
          heading1="Be Part of our Family"
          caption1="PAC Auli is a family thing it will be our pleasure to join the community and be a proud PACian. Our camps are on the prime location of Auli.From where you will be seeing a paranomic view of Nanda Devi,Brahmal,Nar Narayan and Sleeping beauty with a blessed location of a Apple orchid Farm."
          src2={Trekking}
          heading2="Overview"
          caption2="Trekking is something that makes you experience your level of strength. It's tied in with acknowledging demands, vanquishing dread, and exploring uninhabited areas at higher heights.

The Himalayan Trekking Trails in Uttrakhand ,Himanchal and Nepal is acclaimed as the best journeying locales and it draws in travelers from all over the world."
          mainheading="TREKKING"
          link={`/categories/0`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#222222"
            fill-opacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* Expeditions */}
      <div class="curved-div2">
        <Hometext2
          src1={Expedition}
          heading1="Overview"
          caption1="Each pinnacle of mountains isn't that simple to overcome. To investigate the immaculate excellence you need to transform yourself into a monster. 

It doesn't go under adventure sports, it's a dangerous movement to do in the wake of setting yourself up actually and intellectually, and it requires geological and specialized information too. 

There are heaps of mountain tops in our country which go under endeavor yet everybody needs more guts to go there."
          src2={Expedition}
          heading2="Overview"
          caption2="Something alternate which you need to unexpectedly. Skiing is a vigorous and bold game that is useful for raising the pulse and for expanding cardiovascular perseverance. It's astonishing to cover miles in minutes on the most troublesome bends on snow-shrouded mountains.

Auli is the most loved spot for skiing darlings with incredible slants encompassed by excellent valleys. An ideal objective to pick up skiing and practice expertly for competitions."
          mainheading="EXPEDITION"
          link={`/categories/1`}
        />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* Skiing  */}
      <div class="curved-div1">
        <Hometext
          data-aos="fade-left"
          src1={Skiing}
          heading1="Overview"
          caption1="Trekking is something that makes you experience your level of strength. It's tied in with acknowledging demands, vanquishing dread, and exploring uninhabited areas at higher heights.

The Himalayan Trekking Trails in Uttrakhand ,Himanchal and Nepal is acclaimed as the best journeying locales and it draws in travelers from all over the world."
          src2={Skiing}
          heading2="Overview"
          caption2="Something alternate which you need to unexpectedly. Skiing is a vigorous and bold game that is useful for raising the pulse and for expanding cardiovascular perseverance. It's astonishing to cover miles in minutes on the most troublesome bends on snow-shrouded mountains.

Auli is the most loved spot for skiing darlings with incredible slants encompassed by excellent valleys. An ideal objective to pick up skiing and practice expertly for competitions."
          mainheading="SKIING"
          link={`/categories/2`}
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      {/* Camping */}

      <div class="curved-div2">
        <Hometext2
          src1={Camping}
          heading1="Overview"
          caption1="Far away from this populated world, on top of any bluff, the world under the sky brimming with gleaming stars, other than your camp and some tea what else an individual can wish to get harmony. Camping invigorates your brain and soul and assists you in continuing your existence with more energy.

Each individual requires a break from this rushed and occupied way of life when he can invigorate his brain and plan their future. Outdoors in Uttrakhand can help you in reestablishing your energy and inventiveness"
          src2={Camping}
          heading2="Overview"
          caption2="Far away from this populated world, on top of any bluff, the world under the sky brimming with gleaming stars, other than your camp and some tea what else an individual can wish to get harmony. Camping invigorates your brain and soul and assists you in continuing your existence with more energy.

Each individual requires a break from this rushed and occupied way of life when he can invigorate his brain and plan their future. Outdoors in Uttrakhand can help you in reestablishing your energy and inventiveness"
          mainheading="CAMPING"
          link={`/categories/3`}
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      {/* Spiritual Tours */}

      <div class="curved-div1">
        <Hometext
          src1={Chardham}
          heading1=""
          caption1="Uttarakhand is considered as DEV BHOOMI and the whole locale is acclaimed for its otherworldliness. Each of the 4 dhaams are there in Uttarakhand and consistently lakhs of individuals visit Kedarnath, Badrinath, Gangotri, and Yamunotri. Kedarnath sanctuary is quite possibly the most visited puts around here and it just remaining parts open for 6-7 months.Uttarakhand has its own excellence to show and its own story to describe. Its an ideal objective where you can go with your family in light of the fact that there is something for everybody."
          src2={Chardham}
          heading2="Overview"
          caption2="Uttarakhand is considered as DEV BHOOMI and the whole locale is acclaimed for its otherworldliness. Each of the 4 dhaams are there in Uttarakhand and consistently lakhs of individuals visit Kedarnath, Badrinath, Gangotri, and Yamunotri. Kedarnath sanctuary is quite possibly the most visited puts around here and it just remaining parts open for 6-7 months.Uttarakhand has its own excellence to show and its own story to describe. Its an ideal objective where you can go with your family in light of the fact that there is something for everybody."
          mainheading="SPIRITUAL TOURS"
          link={`/categories/4`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#222222"
            fill-opacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* Bike trips */}
      <div class="curved-div2">
        <Hometext2
          src1={BikeTrips}
          heading1="Overview"
          caption1="Riding your number one motor alongside a streaming waterway in a delightful valley, is there much else charming than this? 

Ladakh, the fantasy objective for all riders and it is quite possibly the most visited places in India by bikers. Individuals are getting wild about riding and continue to look for places good for bike riding. 

It's an undertaking movement for individuals with a high Patience level since riding 300-350 kilometers in mountains is an intense assignment."
          src2={BikeTrips}
          heading2="Overview"
          caption2="Riding your number one motor alongside a streaming waterway in a delightful valley, is there much else charming than this? 

Ladakh, the fantasy objective for all riders and it is quite possibly the most visited places in India by bikers. Individuals are getting wild about riding and continue to look for places good for bike riding. 

It's an undertaking movement for individuals with a high Patience level since riding 300-350 kilometers in mountains is an intense assignment."
          mainheading="BIKE TRIPS"
          link={`/categories/5`}
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      {/* Rafting */}

      <div class="curved-div1">
        <Hometext
          src1={Rafting}
          heading1="Overview"
          caption1="Water, quite possibly the most smooth component on this planet. It continues to change its way, nature, and shape according to necessity. Rafting assists you in learning the method of change with hazardous and surprising floods of water.
Searching generally advantageous and testing place for waterway rafting then you should visit Hrishikesh, perhaps the best area in India for boating where you can enjoy rafting in the rushes of the stream strong Ganga."
          src2={Rafting}
          heading2="Overview"
          caption2="Water, quite possibly the most smooth component on this planet. It continues to change its way, nature, and shape according to necessity. Rafting assists you in learning the method of change with hazardous and surprising floods of water.
Searching generally advantageous and testing place for waterway rafting then you should visit Hrishikesh, perhaps the best area in India for boating where you can enjoy rafting in the rushes of the stream strong Ganga."
          mainheading="RAFTING"
          link={`/categories/6`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#222222"
            fill-opacity="1"
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,138.7C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* Cycling */}
      <div class="curved-div2">
        <Hometext2
          src1={Cycling}
          heading1="Overview"
          caption1="Cycling is always more than a adventure as you all know two wheels move the soul.We are offering you the best trails in the valley with the view and track you will never forget.This experience of yours will always live with you with flashbacks of you gliding and enjoying cycling in the Himalayas."
          src2={Cycling}
          heading2="It is a fresh start"
          caption2="Cycling in mountains is a game of riding bicycles on rough terrain, regularly over harsh territory, typically utilizing exceptionally planned off-road bicycles. 

Individuals are presently more worried about contaminations, greenery, just as their wellness consequently the rage for cycling, is expanding now. Individuals like to invest their energy in the middle of nature and investigating places around by cycle."
          mainheading="CYCLING"
          link={`/categories/7`}
        />
      </div>

      {/* Rock Climbing */}

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div class="curved-div1">
        <Hometext
          src1={Rock}
          heading1="xyz"
          caption1="abc"
          src2={Rock}
          heading2="Overview"
          caption2="The sport or activity of climbing rock faces, particularly with the use of ropes and special equipment, is known as rock climbing. The goal is to reach the top or end point of a rock face or structure. Depending on the difficulty and severity of the climb, this can be accomplished with specialised equipment. 

It is a physically demanding sport that combines fitness and agility with the mental toughness required to conquer an ascent or traverse. It can be dangerous, but this is often viewed as a positive aspect of the adventure."
          mainheading="ROCK CLIMBING"
          link={`/categories/8`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#222222"
            fill-opacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,85.3C672,117,768,171,864,165.3C960,160,1056,96,1152,90.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* Snowboarding */}
        <div class="curved-div2">
          <Hometext2
            src1={Snowboarding}
            heading1="Overview"
            caption1="Winter sport with roots in skiing, surfing, and skateboarding in which the primary activity is riding down any snow-covered surface while standing on a snowboard with feet positioned roughly perpendicular to the board and its direction, distinguishing it from skiing, in which riders face forward. Furthermore, unlike skiing, no poles are used, and the majority of participants wear soft- to mid-flexing boots for support. 

Snowboarding is a special kind of medicine for the soul for die-hard riders and enthusiasts all over the world, including this author, because it combines the beauty of nature, the thrill of competition, and the opportunity for self-expression. There is no single method for snowboard.

We have some of the most thrilling destination for snowboarding in Himalayas as Auli,Uttarakhand,Niti Valley and Chopta Valley."
            src2={Snowboarding}
            heading2="Overview"
            caption2="Winter sport with roots in skiing, surfing, and skateboarding in which the primary activity is riding down any snow-covered surface while standing on a snowboard with feet positioned roughly perpendicular to the board and its direction, distinguishing it from skiing, in which riders face forward. Furthermore, unlike skiing, no poles are used, and the majority of participants wear soft- to mid-flexing boots for support. 

Snowboarding is a special kind of medicine for the soul for die-hard riders and enthusiasts all over the world, including this author, because it combines the beauty of nature, the thrill of competition, and the opportunity for self-expression. There is no single method for snowboard.

We have some of the most thrilling destination for snowboarding in Himalayas as Auli,Uttarakhand,Niti Valley and Chopta Valley."
            mainheading="SNOWBOARDING"
            link={`/categories/9`}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
