import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("CrypPricesi");
    const data = await db.collection("bnb_market_data").find({}).sort({ Date: -1 }).limit(1).toArray();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
