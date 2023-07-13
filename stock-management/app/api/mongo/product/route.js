import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    //Replace the uri string with your conection string.

    const uri = "mongodb+srv://mongodb:IJTwr3ZmzKk3Fos9@cluster0.t54uzpg.mongodb.net/";
    const client = new MongoClient(uri);
    
    try{
        const databse = client.db('stock');
        const inventory = database.collection('inventory');
        const query = { };
        const Products = await inventory.find(query).toArray();
        return NextResponse.json({success:true, Products})
    } finally {
        //Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function POST(request) {

    // Replace the uri string with your connection string.
    let body = await request.json()
    console.log(body)
    const uri = "mongodb+srv://mongodb:IJTwr3ZmzKk3Fos9@cluster0.t54uzpg.mongodb.net/";

    const client = new MongoClient(uri);
    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');
        // Query for a movie that has the title 'Back to the Future'
        const product = await inventory.insertOne(body)
        return NextResponse.json({ product, ok: true })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}