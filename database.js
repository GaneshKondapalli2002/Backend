const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/userdata');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection failed:', error);
        process.exit(1);
    }
};

module.exports = {
    connectToDatabase,
};


// const mongoose = require('mongoose');

// const connectToDatabase = async() =>{
//     try{
//         await mongoose.connect('mongodb://localhost:27017/userdata') 
//         console.log('DB connected');
//     } catch (error){
//         console.error('DB connection failed:', error);
//     process.exit(1);
//     }

// };

// module.exports = {
//     connectToDatabase,
// };