import React, { useState, useContext } from "react";
import { Input, Button, Loading } from "../../../components";
import { useForm } from "react-hook-form";
import { useToast } from "../../../services/hook";
import { _post } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { UserContext } from "../../../services/UserContext";

export default function Login() {
  const [togglePassword, setTogglePassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [haveLoginData, setHaveLoginData] = useState(false);
  // const { setUser } = useContext(UserContext);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLoginFormSubmit = async (data) => {
    setHaveLoginData(true);
    try {
      const response = await _post("users/login", data);
      if (response?.status === 200) {
        Cookies.set("accessToken", response?.data?.data?.accessToken, { expires: 7 });
        Cookies.set("refreshToken", response?.data?.data?.refreshToken, { expires: 7 });
        Cookies.set("role", response?.data?.data?.user?.role, { expires: 7 });
        showToast(response.data.message, "success");
        // setUser({ roles: response?.data?.data?.user?.role, loading: false });
        reset();
        navigate("/get-post");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
      setHaveLoginData(false);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="container" style={{ width: "25rem", margin: "auto" }}>
          <h4>Login</h4>
          <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
            <Input label="Username" type="text" {...register("username")} />

            <div style={{ position: "relative" }}>
              <Input label="Password" type={togglePassword ? "text" : "password"} {...register("password")} />
              <Button
                type="button"
                className="btn-primary btn-sm"
                style={{ position: "absolute", top: "2.2rem", right: ".4rem" }}
                onClick={() => setTogglePassword((preValue) => !preValue)}
              >
                {togglePassword ? "show" : "hide"}
              </Button>
            </div>

            <Button type="submit" className="btn-primary">
              {haveLoginData ? <Loading /> : "submit"}
            </Button>

            <p className="mt-4">
              Don't have any account ?<Link to="/sign-up">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
