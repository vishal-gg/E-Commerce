// import { useAppSelector } from "../types/storeType"

// const ProfileScreen = () => {
//     const {userInfo} = useAppSelector(state => state.auth)
//     return (
//         <>
//         <h1>{userInfo?.email}</h1>
//         </>
//     )
// }

// export default ProfileScreen


import { useAppSelector } from "../types/storeType";

const ProfileScreen = () => {
  const { userInfo } = useAppSelector((state) => state.Authentication);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {userInfo ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-gray-700 font-medium">Name:</span>{" "}
                <span className="text-gray-900">{userInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-700 font-medium">Email:</span>{" "}
                <span className="text-gray-900">{userInfo.email}</span>
              </div>
              {/* Add more profile information if available */}
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
