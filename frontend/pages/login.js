import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { login } from '../src/store/user'


export default function LoginPage() {
    const dispatch = useDispatch()
    const router = useRouter()

    const user = useSelector(state => state.user)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    if (user.userName) { router.push('/jobs') }

    function handleSubmit(event) {
        event.preventDefault()
        setErrors([])
        dispatch(login({ userName, password })).then(() => router.push('/jobs')).catch(async (res) => {
            const data = await res.json()
            data?.errors ? setErrors(data.errors) : null;
        })
    }

    return (
        <form onSubmit={handleSubmit}>
             <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <label>
                Username:
                <input
                    type="text"
                    value={userName}
                    onChange={({ target: { value } }) => setUserName(value)}
                    placeholder="username"
                    required>
                </input>
            </label>
            <label>
                Password:
                <input
                    type="text"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    placeholder="password"
                    required>
                </input>
            </label>
            <button type="submit">Log In</button>
        </form>
    )
}