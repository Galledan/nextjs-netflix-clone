import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useBillboard = (id?: string) => {
    const { data,error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher)


    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard;