import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const ProductPage = () => {
  const [data, setData] = useState([]);
  const {user} = useContext(UserContext)

  useEffect(() => {
    let url = "http://localhost:4000/poster/list";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const addToCart = (_id, _name) => {
    if (user){
        const body = new URLSearchParams()
        body.append('poster_id', _id)
        body.append('quantity', 1)
        console.log(user)
        const options = {
            body: body,
            method: "POST",
            headers: {Authorization: `Bearer ${user.access_token}`}
        }
        let url = `http://localhost:4000/cart`
        fetch(url, options).then(res => res.json()).then(data => console.log(data))
        alert(`Du har tilføjet ${_name} til kurven`)
    }
    else {
        alert('Du skal være logget ind for at tilføje til kurv')
    }
  }

  console.log(data);

  return (
    <div>
      <h1>Posters:</h1>
      {data &&
        data.map((item) => {
          return (
            <div style={{display: "grid", gridTemplateColumns: "4fr 1fr"}}>
              <p>{item.name}</p>
              <button onClick={() => addToCart(item.id, item.name)}>Add to cart</button>
            </div>
          );
        })}
    </div>
  );
};
