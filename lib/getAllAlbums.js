import { collectionGroup, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export default async function getAllAlbums() {
  const buffer = [];
  const albums = query(
    collectionGroup(db, "albums"),
    orderBy("year", "desc")
  );
  const querySnapshot = await getDocs(albums);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const cleanedData = {
      ...data,
      lastUpdated: JSON.stringify(data.lastUpdated),
    };

    buffer.push(cleanedData);
  });
  return buffer;
}
