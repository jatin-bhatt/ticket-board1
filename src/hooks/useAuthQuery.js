import { useQuery } from "@apollo/client";
import Config from "../utils/config";


const useAuthQuery = (graphqlQuery, variables = {}) => {
  const { loading, error, data } = useQuery(graphqlQuery, {
    variables: {
        organisationId: Config.organizationId,
        ...variables
    },
    context: {
      headers: {
        Authorization: Config.apiKey
      },
    },
  });

  return { loading, error, data };
};

export default useAuthQuery;