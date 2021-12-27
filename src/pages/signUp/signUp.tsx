import Button from "components/basics/Button";
import Input from "components/basics/Input";
import PageHeader from "components/PageHeader";
import { useState, VFC } from "react";

const SignUp: VFC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <PageHeader>
                Sign Up
            </PageHeader>

            <form onSubmit={handleSubmit}>
                <Input
                    className='mr-2'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                />
                <Input
                    className='mr-2'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                />
                <Button type="submit">Sign up</Button>
            </form>
        </>
    )
}

export default SignUp
