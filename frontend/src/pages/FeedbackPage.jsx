import React, { useState} from "react"; 
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import "../styles/FeedbackPage.css";
import { BASE_URL } from "../utils/api";

function FeedbackPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!description.trim()) {
          alert("Please enter your feedback.");
          return;
        }
      
        const fallbackName = "Anonymous";
        const fallbackEmail = "anonymous@noemail.com";
      
        const payload = {
          feedbackName: name.trim() || fallbackName,
          feedbackEmail: email.trim() || fallbackEmail,
          feedbackDescription: description.trim(),
        };
      
        try {
          const response = await fetch(`${BASE_URL}/storeFeedback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.reason || "Failed to submit feedback.");
          }
      
          alert("Thank you for your feedback!");
          setName("");
          setEmail("");
          setDescription("");
        } catch (err) {
          console.error("Feedback submission failed:", err);
          alert("Something went wrong. Please try again.");
        }
      };
      
      

    return (
        <div className="feedback-page">
            <ExitSettings/>
            <div className="settingsComponent2-container">
                <SettingsComponents/>
            </div>

            <div className="feedback-container">
                <div className="feedbackHeader-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>FEEDBACK</div>
                <div className="feedbackContent-typography" >
                    We value all kinds of feedback!
                </div>
                <div className="line-thick2"></div>

                {/* Input Name */}
                <div className="feedbackHeader-typography" >Name</div>
                <input className="input-container" placeholder="Anonymous if left blank!" style={{ paddingLeft: "10px" }} 
                value = {name} onChange={(e) => setName(e.target.value)}/>

                {/* Input Email */}
                <div className="feedbackHeader-typography" >Email</div>
                <input className="input-container" placeholder="Anonymous if left blank!" style={{ paddingLeft: "10px" }}
                value = {email} onChange={(e) => setEmail(e.target.value)}/>


                {/* Input Description */}
                <div className="feedbackHeader-typography">Description</div>
                
                <div className="description-container">
                <textarea
                    className="description-textarea"
                    placeholder="Enter your feedback here..."
                    value = {description} onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>

                


            </div>
        </div>
    );
}

export default FeedbackPage;