# SC2006
SC2006 Group Project Work

Please view attached [SRS]((SRS_Documentation.pdf))

## Project Architecture & Design



```
SC2006/
│── 📂 frontend/       # React + Tailwind + Axios (Frontend)
│── 📂 backend/        # Flask + MongoDB (Backend)
│── 📜 README.md       # Project documentation
│── 📜 .gitignore      # Ignore unnecessary files
```

```
frontend/
│── 📂 src/
│   ├── 📂 assets/              # Static assets (logos, images)
│   ├── 📂 components/          # Reusable UI components (Buttons, Cards)
│   ├── 📂 context/             # Context API or state management
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 pages/               # Full pages (Dashboard, Profile)
│   ├── 📂 routes/              # Route Definition   
│   ├── 📂 state/               # Global state  using Zustand
│   ├── 📂 styles/              # Tailwind config or additional styles
│   ├── 📂 utils/ 
│   │   ├── 📂 apis/            # Axios API requests
│   ├── App.js                  # Main React App component
│   ├── index.js                # React entry point
│   ├── main.css                # Tailwind styles
│── 📜 package.json             # Frontend dependencies
│── 📜 tailwind.config.js       # Tailwind CSS config
│── 📜 postcss.config.js        # PostCSS config (for Tailwind)
```

### Backend Framework

Flask, Postgre Database

### Frontend Framework

React.js
