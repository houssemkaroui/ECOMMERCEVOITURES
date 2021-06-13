import React from "react";

import {CreateVoiture} from "../service/service"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function AddProduct () {
  const [file,setFile] = React.useState()
  const [namefile,setNamefile] = React.useState()
  const UplodeFile   = (event) =>{
    setFile(URL.createObjectURL(event.target.files[0]))
    setNamefile(event.target.files[0])
  }
  let history = useHistory();
  const { handleSubmit, register, errors } = useForm({});


  function onSubmit(data) {
    let formData = new FormData()
    formData.append('photo', namefile)
    formData.append('name', data.name)
    formData.append('description', data.description)
    CreateVoiture(formData).then((res) =>{
      toast.success("✔️Ajouter fait avec succes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      history.push('/products');
    }).catch(e =>{

      toast.error("❗ vous n'est pas un autoriser", {
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
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
            <div className="field">
              <img src={file}></img>
            </div>
            <div className="field">
                <label className="label">Product Image: </label>
                <input
                  className="input"
                  type="file"
                  name="name"
                  onChange={UplodeFile} 
                  required
                />
              </div>

              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  {...register("name")}
                  required
                />
              </div>
              
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  {...register("email")}
             
                />
              </div>
             
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
              
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  
}

