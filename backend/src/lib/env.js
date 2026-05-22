import "dotenv/config"

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};


// PORT=5000
// MONGO_URI=mongodb://abhaynagpure99_db_user:ElQu7zUFuVMOXPAn@ac-4dtvjdz-shard-00-00.1xvauk1.mongodb.net:27017,ac-4dtvjdz-shard-00-01.1xvauk1.mongodb.net:27017,ac-4dtvjdz-shard-00-02.1xvauk1.mongodb.net:27017/Chatify_db?ssl=true&replicaSet=atlas-5mx3an-shard-0&authSource=admin&appName=Cluster0
// NODE_ENV=development
// JWT_SECRET=myjwtsecret
// RESEND_API_KEY=re_TbaPymf7_MXoZQV5xAFeBX2g7hhQXSiye

// EMAIL_FROM="onboarding@resend.dev"
// EMAIL_FROM_NAME="Abhay Nagpure"

// CLIENT_URL=http://localhost:5173