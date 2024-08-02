import React, { useState } from "react";
import { Input, Button, Dropdown, Loading } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../../../services/hook";
import { _post } from "../../../services/api";
import { dropdownValuesForRole } from "../../../utils/constant";

export default function Signup() {
  const [togglePassword, setTogglePassword] = useState(false);
  const { showToast } = useToast();
  const [isSubmitedForm, setIsSubmitedForm] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      role: "",
    },
  });

  const handleSignUpFormSubmit = async (data) => {
    setIsSubmitedForm(true);
    try {
      const response = await _post("users/register", data);
      if (response?.status === 201) {
        showToast(response.data.message, "success");
        reset();
        navigate("/login");
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
      setIsSubmitedForm(false);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="container" style={{ width: "25rem", margin: "auto" }}>
          <h4>Sign Up</h4>

          <form onSubmit={handleSubmit(handleSignUpFormSubmit)}>
            <Input label="Email" type="Email" {...register("email")} />
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

            <Dropdown options={dropdownValuesForRole} label="Role" {...register("role")} />

            <Button type="submit" className="btn-primary">
              {isSubmitedForm ? <Loading /> : "Submit"}
            </Button>
          </form>

          <p className="mt-4">
            I have an account <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
