import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // Adjust the path as necessary

export async function getServerData() {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "your-collection"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return { props: { data } }; // Data will be available as props in your component
}

export default function DataPage({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div> // Adjust according to your data structure
      ))}
    </div>
  );
}

    

                            
