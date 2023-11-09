import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

export const CartPage = ()=> {
    const [cartData, setCartData] = useState()
    const {user} = useContext(UserContext)
    const navigate = useNavigate()


    const fetchCartData = () => {
        let url = "http://localhost:4000/cart"
        let options = {
            headers: {Authorization: `Bearer ${user.access_token}`}
        }
        fetch(url, options).then(res => res.json()).then(data => setCartData(data))
    }

    useEffect(() => {

        if (user) {
            fetchCartData()
        }
        else {
            navigate('/login')
        }

    },[])

    console.log(cartData)

    const handleDelete = (_id, _posterid) => {
        let url = `http://localhost:4000/cart/${_id}?poster_id=${_posterid}`
        let options = {
            method: "DELETE",
            headers: {Authorization: `Bearer ${user.access_token}`}
        }
        fetch(url, options).then(res => res.ok ? fetchCartData() : alert("Du for en fejl"))
    }

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {cartData && cartData.map((item, index) => {
                    return <div style={{display: "grid"}}>
                        <p key={index}>{item.poster.name}</p>
                        <button onClick={() => handleDelete(item.id, item.poster_id)}>Delete</button>
                    </div>
                })}
            </div>
        </div>
    )
}