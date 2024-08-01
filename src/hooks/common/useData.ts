import { useState} from "react";
import {AxiosResponse} from 'axios'

function useData<T, P = undefined>(fetcherFunc: (params: P) => Promise<AxiosResponse<T>>) {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    function fetch(params: P) {
        setIsLoading(true);
        fetcherFunc(params)
            .then(res => res.data)
            .then(data => setData(data))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }

    return {
        data,
        isLoading,
        error,
        fetch
    }
}

export default useData;