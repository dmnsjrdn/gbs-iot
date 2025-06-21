import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiUsers";

export function userUser() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user_extension", userId],
    queryFn: () => getUser(userId),
    retry: false,
  });

  return { isLoading, error, user };
}
