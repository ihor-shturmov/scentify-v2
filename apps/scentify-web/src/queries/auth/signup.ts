import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SignUpSchemaType } from "../../types/signup";
import { useAuthStore } from "../../store/auth.store";

function useSignup() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const { mutateAsync, ...rest } = useMutation({
        mutationFn: async (data: SignUpSchemaType) => {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Signup failed');
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

export default useSignup;
