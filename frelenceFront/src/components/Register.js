import React, { useEffect, useState } from "react";

import { RegisterUser } from "../service/service"
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Register() {
  const { handleSubmit, register, errors } = useForm({});
  let history = useHistory();

  function onSubmit(data) {
    RegisterUser(data).then(res => {
      toast.success("✔️Register fait avec succes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      history.push('/login')
    })
      .catch((e) => {
        toast.error('❗ un error se produit', {
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
          <h4 className="title">Register</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label" htmlFor="name">Name: </label>
              <input
                className="input"
                type="name"
                name="name"
                {...register("name")}
              />

            </div>
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
            <div className="field">
              <label className="label" htmlFor="passwordConfirm">Confirm Password: </label>
              <input
                className="input"
                type="password"
                name="passwordConfirm"
                {...register("passwordConfirm")}

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
    // ) : (
    //   <Redirect to="/login" />
  );

}

