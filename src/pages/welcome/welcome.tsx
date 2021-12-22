import { useAuth } from "hooks/useAuth";

const Welcome = () => {
    const { user } = useAuth();
    return (
        <div>
            Welcome {user.userName}
        </div>
    )
}

export default Welcome;