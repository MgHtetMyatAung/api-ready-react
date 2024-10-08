import { useEffect } from "react";
import { productApi } from "./services/api.export";
import { setCredentials } from "./app/auth/authSlice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = productApi.useGetProductsQuery({
    categoryId: "cat_4WJvlKXD7wbYV1",
  });

  console.log(data);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCredentials({ user: "hma", accessToken: "hello123" }));
    }
  }, [isLoading]);
  return (
    <div>
      <div className=" container mx-auto py-5">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className=" grid grid-cols-7 gap-8">
            {data.map((item) => (
              <div
                key={item.id}
                className=" p-5 rounded-lg shadow-md border relative"
              >
                <img
                  src={item.image.url}
                  alt={item.name}
                  className=" w-[120px] rounded-md mx-auto"
                />
                <p className=" text-center font-medium mt-3 mb-2">
                  {item.name}
                </p>
                <p className=" text-center font-semibold absolute -bottom-5 w-full left-0 bg-gray-800 p-2 rounded-md text-white">
                  {item.price.raw} MMK
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
