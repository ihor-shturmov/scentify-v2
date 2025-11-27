import { useQuery } from "@tanstack/react-query";
import { Perfume } from "@scentify/shared-types";
import { config } from "../../lib/config";

const usePerfumes = () => {
    const { data, isLoading, error } = useQuery<Perfume[]>({
        queryKey: ['perfumes'],
        queryFn: async () => {
            const response = await fetch(`${config.apiUrl}/perfumes`);
            const json = await response.json();
            return json.data;
        },
    });

    return { data, isLoading, error };
};

export default usePerfumes;