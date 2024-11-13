import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const MyPage = () => {
  const { data, error } = useSWR("/api/mypage", fetcher);
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>{data}</div>;
};

export default MyPage;
