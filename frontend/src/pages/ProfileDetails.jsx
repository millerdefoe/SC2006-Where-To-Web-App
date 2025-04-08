import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as UserIcon } from "../assets/UserIcon.svg";
import { ReactComponent as OpenEye } from "../assets/OpenEye.svg";
import { ReactComponent as ClosedEye } from "../assets/ClosedEye.svg";
import { ReactComponent as EditProfileButton } from "../assets/EditProfileButton.svg";
import { ReactComponent as SaveDetailsButton } from "../assets/SaveDetailsButton.svg";
import { ReactComponent as DeleteAccountButton } from "../assets/DeleteAccountButton.svg";
import { ReactComponent as LogOutButton } from "../assets/LogOutButton.svg";
import { getUserFromCookie, saveUserToCookie, deleteCookie, isValidPassword } from "../components/ProfileUtils";
import bcrypt from 'bcryptjs';
import "../styles/ProfileDetails.css";

const ProfileDetails = () => {
    const [password, setPassword] = useState("MySecureP@ssw0rd!");
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [rfid, setRfid] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const fixedSalt = '$2a$10$abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'; // Fixed salt

    async function generateDeterministicHash(password) {
      try {
        const hash = await bcrypt.hash(password, fixedSalt); 
        return hash;
      } catch (error) {
        console.error('Error hashing the password:', error);
        return null;
      }
    }


    useEffect(() => {
        const savedUser = getUserFromCookie();
        if (!savedUser || !savedUser.password) {
          navigate("/profile-sign-up");
          return;
        }
        setUser(savedUser);
        setPassword(savedUser.password || "");
        setRfid(savedUser.rfid || "");
      }, [navigate]);
    
      const handleSave = async () => {
        if (!password.trim()) {
          alert("Password cannot be empty.");
          return;
        }
      
        if (!isValidPassword(password)) {
          alert("Password must be at least 8 characters long and include at least one number, one uppercase letter, and one lowercase letter.");
          return;
        }
      
        const requestData = {
          username: user.identifier,
        };
      
        // Include password only if it was changed
        if (password !== user.password) {
          const hashedPassword = await generateDeterministicHash(password);
          if (!hashedPassword) {
            alert("Failed to hash the password.");
            return;
          }
          requestData.password = hashedPassword;
        }
      
        // Include RFID only if it was changed
        if (rfid !== user.rfid) {
          requestData.rfid = rfid;
        }
      
        if (!requestData.password && !requestData.rfid) {
          alert("No changes detected.");
          return;
        }
      
        try {
          const res = await fetch("http://127.0.0.1:5000/editUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });
      
          const data = await res.json();
      
          if (res.status === 200 && data.status === "user editted") {
            const updatedUser = {
              ...user,
              password: requestData.password || user.password,
              rfid: requestData.rfid || user.rfid,
            };
            setUser(updatedUser);
            saveUserToCookie(updatedUser);
            setIsEditing(false);
            alert("Profile updated successfully!");
          } else {
            alert(`Failed to update profile: ${data.reason}`);
          }
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Something went wrong while updating your profile.");
        }
      };
      
      
    
      const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;
      
        try {
          const res = await fetch("http://127.0.0.1:5000/deleteUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: user.userid }),
          });
      
          const data = await res.json();
      
          if (res.status === 200 && data.status === "user deleted") {
            deleteCookie("user");
            localStorage.removeItem("user");
            alert("Your account was successfully deleted.");
            navigate("/profile-sign-up");
          } else {
            alert(`Failed to delete account: ${data.reason}`);
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Something went wrong while deleting your account.");
        }
      };
      

      const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/profile-sign-up"); 
      };
    
      if (!user) return null;

  return (
    <div className="profile3-page">
        <ExitSettings/>
        <SettingsComponents/>

            <div className="profile3-container">
                <div className="profileHeader3-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>PROFILE</div>
                <div className="profileContent3-typography" style={{ paddingLeft: "0px" }}>Create an account or log in!</div>
                <div className="line-thick"></div>

                <div className="user-profile-container">
                    <UserIcon className="user-profile-icon" />
                </div>

                <div className="emailPhone3-container">
          <div className="emailPhone3-typography">{user?.identifier || "Not set"}</div>
        </div>

        <div className="line-thick"></div>

        <div className="password3-container">
          <div className="password-rfid-typography">Password</div>
          <div className="password-right">
            {isEditing ? (
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <div className="details-typography">
                {showPassword ? password : "•".repeat(password.length)}
              </div>
            )}
            <button className="eye1-container" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ClosedEye className="eye-icon" /> : <OpenEye className="eye-icon" />}
            </button>
          </div>
        </div>

        <div className="line-thick"></div>

        <div className="rfid2-container">
          <div className="password-rfid-typography">RFID Tag</div>
          <div className="rfid-right">
            {isEditing ? (
              <input
                type="text"
                value={rfid}
                onChange={(e) => setRfid(e.target.value)}
              />
            ) : (
              <div className="details-typography">{rfid || "Not set"}</div>
            )}
          </div>
        </div>

        <div className="line-thick"></div>

        <div className="button-group">
          <button
            className="editProfile-container"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            <EditProfileButton className="editProfile-icon" />
          </button>

          {isEditing && (
            <button className="saveProfile-button" onClick={handleSave}>
              <SaveDetailsButton className="saveProfile-icon" />
            </button>
          )}

          <button
            className={`deleteAccount-button ${!isEditing ? "shift-left" : ""}`}
            onClick={handleDeleteAccount}
          >
            <DeleteAccountButton className="deleteAccount-icon" />
          </button>

          <button className="logOut-button" onClick={handleLogout}>
            <LogOutButton className="logOut-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;