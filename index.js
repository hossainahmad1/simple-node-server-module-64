const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;


// const users = [
//     { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
//     { id: 2, name: 'sabnoor', email: 'sabnoor@gmail.com' },
//     { id: 3, name: 'sabila', email: 'sabila@gmail.com' }
// ]

app.get('/', (req, res) => {
    res.send('node server is running port');
})

app.use(cors())
app.use(express.json())

// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered);
//     }
//     else {

//         res.send(users)
//     }
// })

// app.post('/users', (req, res) => {
//     console.log('post api called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user)
//     res.send(user)
// })

// username: dbUser1
// password: wGni0YUgFCu0eZEb



const uri = "mongodb+srv://dbUser1:wGni0YUgFCu0eZEb@cluster0.2wczu4w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('user');
        // const user = { name: 'nahiya mahi', email: 'nehi@gmail.com' }

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })





        app.post('/users', async (req, res) => {
            const user = req.body;
            // user.id = users.length + 1;
            // ers.push(user)
            const result = await userCollection.insertOne(user)
            user._id = result.insertedId;
            console.log(result)
            res.send(user)
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`node server is running ${port}`)
})