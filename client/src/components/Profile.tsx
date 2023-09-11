import { useAppSelector } from "../types/storeType";

const ProfileScreen = () => {
  const { userInfo } = useAppSelector((state) => state.Authentication);

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        {userInfo ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              User Profile
            </h1>
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-gray-700 font-medium">Name:</span>{" "}
                <span className="text-gray-900">{userInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-700 font-medium">Email:</span>{" "}
                <span className="text-gray-900">{userInfo.email}</span>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
            User not logged in
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
