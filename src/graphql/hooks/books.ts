import { useQuery } from '@apollo/client';
import {GET_BOOKS} from '../gql/books'

export const useGetBooks =(after?:any,before?:any)=>{
    const {data,error,loading} = useQuery(GET_BOOKS)
    return {
        data,
        loading,
        error
    }
}