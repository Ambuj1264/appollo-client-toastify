
import { useQuery,gql } from '@apollo/client';

const FILMS_QUERY = gql`
query Query {
    getAllUser {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const useUserQuery=()=>{
    const {error, loading, data}= useQuery(FILMS_QUERY);
    return {error, loading, data};

}
