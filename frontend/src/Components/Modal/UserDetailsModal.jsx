import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserDetails({ loggedInUser, setShowUserDetails, setLoggedInUser }) {
  
  const handleLogout = () => {
    setLoggedInUser(null);     
    setShowUserDetails(false); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Card className="w-full max-w-sm bg-white p-4 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            User Details
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-1">
          <p className="text-lg font-semibold">Welcome, {loggedInUser.name} 👋</p>
          <p className="text-gray-600">{loggedInUser.email}</p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full"
            onClick={() => setShowUserDetails(false)}
          >
            Close
          </Button>

          <Button
            variant="destructive"
            className="w-full bg-white border-black border-1 text-black"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
