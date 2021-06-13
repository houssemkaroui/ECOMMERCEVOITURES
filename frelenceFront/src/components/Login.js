import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../service/service"
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Login() {

  const { handleSubmit, register, errors } = useForm({});
  let history = useHistory();
  function onSubmit(data) {
    LoginUser(data).then(res => {
      toast.success("✔️Login fait avec succes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      history.push('/products');
      localStorage.setItem("token", res.data.token)
      localStorage.setItem('role',res.data.data.user.role)
    }).catch(err => {
      console.log(err)
      toast.error('❗ Verifer votre email et password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,

      });
    })
  }
  return (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Login</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label" htmlFor="email">Email: </label>
              <input
                className="input"
                type="email"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="password">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                {...register("password")}
              />
            </div>

            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )

}

