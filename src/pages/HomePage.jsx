import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"

export const HomePage = () => {

    const {user} = useContext(UserContext)

    console.log(user)

    return (
        <>
        <h1>Homepage</h1>
        <section>
            {user ? <p>Velkommen {user.firstname} {user.lastname}</p> : <p>Du er ikke logget ind</p>}
        </section>
        </>


    )
}