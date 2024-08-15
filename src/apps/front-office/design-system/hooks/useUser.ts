import { getMe } from "apps/front-office/account/service/auth";
import { useEffect, useState } from "react";
import { User } from "../utils/types";

type UserType = {
  user: User;
};
export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<UserType>();

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getMe();
        setData(data);
      } catch (errorL: any) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchCategory();
  }, [error]);

  return { data, isLoading, error };
};
