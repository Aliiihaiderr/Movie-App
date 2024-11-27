import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "./Login/atoms";

const userAuthPersist = () => {
    const [auth, setAuth] = useRecoilState(userAtom);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth))
        }
    }, [setAuth])

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth'); 
        }
    }, [auth]);

    return auth;
}

export default userAuthPersist;