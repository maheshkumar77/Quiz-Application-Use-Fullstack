const express= require ('express');
const axios= require ('axios');
const cors=require('cors');

const app = express();
app.use(cors());

app.get("/quizdata", async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        res.json(response.data); // Send the data back to the client
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).json({ error: 'Failed to fetch quiz data' }); // Send an error response
    }
});

const PORT =5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});