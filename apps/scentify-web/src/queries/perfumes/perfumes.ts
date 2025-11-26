import { useQuery } from "@tanstack/react-query";
import { Perfume } from "@scentify/shared-types";

const usePerfumes = () => {
    const { data, isLoading, error } = useQuery<Perfume[]>({
        queryKey: ['perfumes'],
        queryFn: async () => {
            const response = await fetch('/api/perfumes');
            const json = await response.json();
            return json.data;
        },
    });

    return { data, isLoading, error };
};

export default usePerfumes;