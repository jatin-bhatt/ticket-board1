import { useMutation } from "@apollo/client";
import Config from "../utils/config";

const useAuthMutation = (graphqlMutation, options = {}) => {
  const [mutate, { loading, error, data }] = useMutation(graphqlMutation, {
    context: {
      headers: {
        Authorization: Config.apiKey
      },
    },
    ...options,
  });

  const customMutate = (variables) => {
    return mutate({
      variables: {
        ...variables,
        organisationId: Config.organizationId,
      },
    });
  };

  return { customMutate, loading, error, data };
};

export default useAuthMutation;