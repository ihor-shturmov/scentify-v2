import { useQuery } from "@tanstack/react-query";
import { Perfume } from "@scentify/shared-types";
import { config } from "../../lib/config";

const usePerfumeDetail = (id: string) => {
    if (!id) {
        throw new Error('Perfume ID is required');
    }

    const { data, isLoading, error } = useQuery<Perfume>({
        queryKey: ['perfume-detail', id],
        queryFn: async () => {
            const response = await fetch(`${config.apiUrl}/perfumes/${id}`);
            const json = await response.json();
            return json.data;
        },
    });

    return { data, isLoading, error };
};

export default usePerfumeDetail;
