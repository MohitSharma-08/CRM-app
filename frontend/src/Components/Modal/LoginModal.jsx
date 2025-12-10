import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { apiClient } from "../../webservices/apiClient";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";

export default function LoginModal({ setLoggedInUser }) {
  const [loginOrSign, setloginOrSign] = useState(true);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: "",
  });

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const dispatch = useDispatch();

  const toggleLogin = () => setloginOrSign((prev) => !prev);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password)
      return toast.error("Please fill all fields");

    try {
      const data = await apiClient("auth/login", {
        method: "POST",
        body: loginForm,
      });

      setLoggedInUser(data);
      dispatch(loginSuccess({ user: data }));

      toast.success("Logged in successfully!");

    } catch (error) {
      toast.error(error.message || "Server error");
    }

  };

  // SIGNUP
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!signUpForm.name || !signUpForm.email || !signUpForm.password)
      return toast.error("Please fill all fields");

    const payload = {
      name: signUpForm.name,
      email: signUpForm.email,
      password: signUpForm.password,
      country: selectedCountry,
      state: selectedState,
      city: signUpForm.city,
      phone: signUpForm.phone,
      phone_code: phoneCode,
    };

    try {
      const data = await apiClient("auth/register", {
        method: "POST",
        body: payload,
      });
      console.log("login response:", data);

      
      setLoggedInUser(data);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message || "Server error");
    }
  };

  // COUNTRY / STATE / CITY HANDLERS
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);

    const stateList = State.getStatesOfCountry(countryCode);
    setStates(stateList);
    setCities([]);

    const selected = countries.find((c) => c.isoCode === countryCode);
    setPhoneCode(selected?.phonecode || "");
  };

  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);

    const cityList = City.getCitiesOfState(selectedCountry, stateCode);
    setCities(cityList);
  };

  return (
    <div className="min-h-screen min-w-sm bg-white flex flex-col gap-y-4 justify-center items-center">
      {loginOrSign ? (
        <>
          <Card className="w-full max-w-sm">
            <CardHeader className="w-full flex flex-col items-center text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="m@example.com"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={toggleLogin}
                  >
                    Create an account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpForm.name}
                      onChange={(e) =>
                        setSignUpForm({ ...signUpForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      value={signUpForm.email}
                      onChange={(e) =>
                        setSignUpForm({ ...signUpForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      value={signUpForm.password}
                      onChange={(e) =>
                        setSignUpForm({
                          ...signUpForm,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Country</Label>
                    <select
                      className="border p-2 rounded-md"
                      onChange={(e) => handleCountryChange(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label>State</Label>
                    <select
                      className="border p-2 rounded-md"
                      onChange={(e) => handleStateChange(e.target.value)}
                      disabled={!selectedCountry}
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s.isoCode} value={s.isoCode}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label>City</Label>
                    <select
                      className="border p-2 rounded-md"
                      disabled={!selectedState}
                      onChange={(e) =>
                        setSignUpForm({ ...signUpForm, city: e.target.value })
                      }
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Contact Number</Label>
                    <div className="flex gap-2">
                      <Input
                        className="w-20 text-center"
                        value={phoneCode ? `+${phoneCode}` : ""}
                        disabled
                      />
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        onChange={(e) =>
                          setSignUpForm({
                            ...signUpForm,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={toggleLogin}
                  >
                    Login instead
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
