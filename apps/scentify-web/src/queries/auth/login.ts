import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginSchemaType } from "../../types/login";
import { useAuthStore } from "../../store/auth.store";
import { config } from "../../lib/config";

function useLogin() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            const response = await fetch(`${config.apiUrl}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data.user && data.token) {
                setUser(data.user, data.token);
                navigate('/');
            }
        },
    });

    return { mutateAsync, ...rest };
}

export default useLogin;
