import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { wait } from "../../utilities";
import BgImage from "./sandwich-2619172_1920.jpg"

export default function FAQ() {
  const [arrowDirections, setArrowDirections] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]); 

  const sectionQuestionAndAnswers = [
    {
      showQuestions: false,
      section: "General Questions",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: What is JJRSadwiches?",
          answer: "A: JJRSadwiches is a community-driven platform dedicated to sharing and discovering sandwich recipes from around the world. Whether you're a sandwich aficionado or just looking for new ideas, we have something for everyone."
        },
        {
          showAnswer: false,
          question: "Q: How do I create an account?",
          answer: "A: Click on the \"Sign Up\" button at the top right corner of the homepage, fill in your details, and you're ready to start sharing and saving recipes!"
        },
        {
          showAnswer: false,
          question: "Q: Is JJRSadwiches free to use?",
          answer: "A: Yes, our website is completely free to use. You can browse, share, and save recipes without any cost."
        }
        
      ]
    },
    {
      showQuestions: false,
      section: "Recipe Submission",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: How do I submit my own sandwich recipe?",
          answer: "A: To submit a recipe, you need to create an account and log in. Once logged in, click on the \"Submit a Recipe\" button in the navigation bar, fill out the required fields, upload a photo, and click \"Submit.\""
        },
        {
          showAnswer: false,
          question: "Q: What kind of recipes can I submit?",
          answer: "A: You can submit any sandwich recipe that you love! Whether it's a classic, a family favorite, or an innovative creation, we welcome all types of sandwiches."
        },
        {
          showAnswer: false,
          question: "Q: Can I edit my recipe after submitting it?",
          answer: "A: Yes, you can edit your recipe by going to your profile, finding the recipe you want to edit, and clicking the \"Edit\" button. Make your changes and save them."
        }
      ]
    },
    {
      showQuestions: false,
      section: "Using the Website",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: How can I search for recipes?",
          answer: "A: Use the search bar at the top of the homepage to enter keywords, ingredients, or recipe names. You can also browse by categories or check out featured and trending recipes."
        },
        {
          showAnswer: false,
          question: "Q: How do I save recipes to my profile?",
          answer: "A: To save a recipe, click the \"Save\" button on the recipe page. You need to be logged in to save recipes to your profile for easy access later."
        },
        {
          showAnswer: false,
          question: "Q: Can I share recipes on social media?",
          answer: "A: Yes, each recipe page has social media share buttons. You can share your favorite recipes on Facebook, Twitter, Instagram, and more."
        }
        
      ]
    },
    {
      showQuestions: false,
      section: "Community and Engagement",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: How do I leave a comment on a recipe?",
          answer: "A: To leave a comment, go to the recipe page, scroll down to the comments section, and type your message. You need to be logged in to leave a comment."
        },
        {
          showAnswer: false,
          question: "Q: How can I rate a recipe?",
          answer: "A: On each recipe page, you can rate the recipe by clicking on the star rating system. Your feedback helps other users discover great recipes!"
        },
        {
          showAnswer: false,
          question: "Q: How do I connect with other users?",
          answer: "A: You can connect with other users by following them, commenting on their recipes, and engaging in community forums. Building connections is a great way to share your love for sandwiches and exchange tips and ideas."
        }
        
      ]
    },
    {
      showQuestions: false,
      section: "Technical Issues",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: I'm having trouble with my account. What should I do?",
          answer: "A: If you're experiencing issues with your account, please contact our support team through the \"Contact Us\" page. Provide as much detail as possible about the problem, and we'll help resolve it."
        },
        {
          showAnswer: false,
          question: "Q: The website isn't loading properly. What can I do?",
          answer: "A: Try refreshing the page, clearing your browser cache, or accessing the site from a different browser. If the issue persists, please contact us through the \"Contact Us\" page."
        },
        {
          showAnswer: false,
          question: "Q: How do I reset my password?",
          answer: "A: Click on the \"Forgot Password\" link on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
        },
        
      ]
    },
    {
      showQuestions: false,
      section: "Contact and Support",
      QuestionAndAnswers: [
        {
          showAnswer: false,
          question: "Q: How can I contact JJRSadwiches?",
          answer: "A: You can reach us through the \"Contact Us\" page. Fill out the form with your query, and we'll get back to you as soon as possible."
        },
        {
          showAnswer: false,
          question: "Q: Do you have a mobile app?",
          answer: "A: Currently, we do not have a mobile app, but our website is fully optimized for mobile browsing. You can easily access and use all features on your smartphone or tablet."
        }

      ]
    }
  ];

  const drawQuestionAndAnswers = (questionAndAnswer) => {
    return(
      <div key={questionAndAnswer.question} className="flex flex-col p-2">
        <div className="p-1 font-medium text-base lg:text-lg hover:cursor-pointer transition-colors duration-300 hover:text-[#f29260]"
        onClick={async ()=>{
          const tab = document.getElementById(questionAndAnswer.question);
         if(questionAndAnswer.showAnswer === false){
          tab.style.display = "block";
          await wait(200);
          tab.style.opacity = "1";
         }
         else{
          tab.style.opacity = "0";
          await wait(200);
          tab.style.display = "none";
         }
         questionAndAnswer.showAnswer = !(questionAndAnswer.showAnswer);
        }}
        >
        {questionAndAnswer.question}
        </div>
        <div className="p-1 transition-all duration[350ms] opacity-0 hidden" id={questionAndAnswer.question}>{questionAndAnswer.answer}</div>
      </div>
    )
  };

  const drawSectionQuestionAndAnswers = (section) => {
    let temp = arrowDirections;
      return(
        <div key={section.section} className="flex flex-col p-2  border-b-[1px] border-white border-opacity-25 ">
          <div className="flex flex-row items-center justify-between font-semibold p-1 hover:cursor-pointer transition-colors duration-300 hover:text-[#f29260]"
          onClick={async () => {
            const tab = document.getElementById(section.section);
           if(section.showQuestions === false ){
            tab.style.display = "block";
            await wait(200);
            tab.style.opacity = "1"; 
           }
           else{
            tab.style.opacity = "0";
            await wait(200);
            tab.style.display = "none";
           }
              section.showQuestions = !(section.showQuestions);
              temp[sectionQuestionAndAnswers.indexOf(section)] = !temp[sectionQuestionAndAnswers.indexOf(section)];
              setArrowDirections(temp); 
          }}
          ><span className=" text-lg lg:text-xl">{section.section}</span>
          { arrowDirections[sectionQuestionAndAnswers.indexOf(section)] ? 
          (<FontAwesomeIcon icon={faAngleUp} className="text-white"/>)
          :
          (<FontAwesomeIcon icon={faAngleDown} className="text-white"/>)}
          </div>
          <div className="hidden transition-all duration-[350ms] opacity-0 p-1 bg-black bg-opacity-40 rounded-[18px]" id={section.section} >
            {section.QuestionAndAnswers.map(drawQuestionAndAnswers)}
          </div>
        </div>
      )
  };

  return (
    <div >
    <div className="flex flex-col min-h-full h-screen overflow-y-auto ">
      <NavBar />
      <div className="flex flex-col bg-fixed bg-cover bg-center items-center min-h-full "
      style={{
        backgroundImage: `url(${BgImage})`
      }}
      >
        <div className="flex flex-col items-center p-2 backdrop-blur-[8px] min-h-full h-screen bg-black  bg-opacity-35 text-white border-[1px]">
      <div className="mb-[5%] mt-[1%] text-white w-[75%]">
      <h1 className="text-center font-bold text-2xl sm:text-3xl">FAQ</h1>

      <p className="text-center p-2 lg:text-xl font-normal">Welcome to our FAQ page! Here, you'll find answers to the most common questions about JJRSadwiches. 
        If you don't find what you're looking for, feel free to contact us.
        </p>
        </div>
        <div className="bg-black  bg-opacity-10 text-white border-[1px] question-tab-transition border-white border-opacity-75 w-full lg:w-[70%] rounded-[18px] overflow-y-auto">
          {sectionQuestionAndAnswers.map(drawSectionQuestionAndAnswers)}
        </div>
         
         
         </div>
         </div>
      <Footer />
    </div>
    </div>
  );
}
