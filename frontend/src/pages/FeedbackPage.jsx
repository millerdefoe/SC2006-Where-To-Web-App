import React, { useState} from "react"; 
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import "../styles/FeedbackPage.css";

function FeedbackPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!name.trim()){
            alert("Please enter your name!");
            return;
        }

        if (!email.trim()) {
            alert("Please enter your email.");
            return;
          }
        
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        if (!description.trim()) {
            alert("Please enter your feedback.");
            return;
        }
        else {
            alert("Thank you for your feedback!");
            setName("");
            setEmail("");
            setDescription("");
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
                <div className="line-thick0" ></div>

                {/* Input Name */}
                <div className="feedbackHeader-typography" >Name</div>
                <input className="input-container" placeholder="Input here!" style={{ paddingLeft: "10px" }} 
                value = {name} onChange={(e) => setName(e.target.value)}/>

                {/* Input Email */}
                <div className="feedbackHeader-typography" >Email</div>
                <input className="input-container" placeholder="Input here!" style={{ paddingLeft: "10px" }}
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