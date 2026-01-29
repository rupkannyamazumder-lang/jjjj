const express = require('express');
const cors = require('cors'); // Essential for linking frontend and backend
const app = express();

app.use(cors());
app.use(express.json());

// Simulated Database
let medoraStore = {
    profiles: {},
    vitalityLogs: [] 
};

// --- IDENTITY LINK: Stores Name, Age, Height, Weight ---
app.post('/api/profile', (req, res) => {
    const { name, metrics } = req.body;
    medoraStore.profiles[name] = metrics;
    res.json({ status: "Identity Synced Successfully" });
});

// --- VITALITY LINK: Syncs Steps & Mood + Trigger Safety Net ---
app.post('/api/sync-vitality', (req, res) => {
    const { steps, mood, energy } = req.body;
    
    // Log data for history
    medoraStore.vitalityLogs.push({ date: new Date().toLocaleDateString(), steps, mood, energy });

    // Safety Net Logic: Trigger breathing screen if mood is "Very Low"
    const triggerSafety = (mood === "Very Low");
    
    res.json({ 
        triggerSafety: triggerSafety,
        message: triggerSafety ? "Calm mode recommended." : "Data saved." 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend live on port ${PORT}`));
