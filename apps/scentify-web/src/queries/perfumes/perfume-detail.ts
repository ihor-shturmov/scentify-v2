import { useQuery } from "@tanstack/react-query";
import { Perfume } from "@scentify/shared-types";

const usePerfumeDetail = (id: string) => {
    if (!id) {
        throw new Error('Perfume ID is required');
    }

    const { data, isLoading, error } = useQuery<Perfume>({
        queryKey: ['perfume-detail', id],
        queryFn: async () => {
            const response = await fetch(`/api/perfumes/${id}`);
            const json = await response.json();
            return json.data;
        },
    });

    return { data, isLoading, error };
};

export default usePerfumeDetail;
