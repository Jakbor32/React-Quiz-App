import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./form.css";

const Form = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });

  // move to quiz with state
  const onSubmit = (data) => {
    navigate("/quiz", { state: { data } });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Welcome to Quiz App</h2>
      <hr />
      <label className="label-input" htmlFor="name">
        Name:
      </label>
      <input
        {...register("name", { required: "The field is required" })}
        type="text"
        id="name"
      />
      <p>{errors.name?.message}</p>
      <label className="label-input" htmlFor="surname">
        Surname:
      </label>
      <input
        {...register("surname", { required: "The field is required" })}
        type="text"
        id="name"
      />
      <p>{errors.surname?.message}</p>
      <label className="label-input" htmlFor="name">
        Email:
      </label>
      <input
        {...register("email", { required: "The field is required" })}
        type="email"
        id="name"
      />
      <p>{errors.email?.message}</p>

      <input type="submit" value="Sing Up" />
    </form>
  );
};

export default Form;
