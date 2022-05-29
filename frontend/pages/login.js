import { useState } from "react"

export default function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    return (
        <form>
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