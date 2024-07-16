import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

const ProtectedRoute = (Component) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = getCookie('admin');
            if (!isAuthenticated) {
                router.push('/admin/auth/sign-in');
            }
        }, [router]);

        return <Component {...props} />;
    };
};

export default ProtectedRoute;
