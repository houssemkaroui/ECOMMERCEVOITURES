import React, { useEffect, useState } from "react";

import { ListeVoiture } from "../service/service"
import { AjouterCommenatire, ListeCommenatireByVoiture } from '../service/service'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function ProductList() {
  const [active, setActive] = React.useState('')
  const [activeliste, setActiveliste] = React.useState('')
  const { handleSubmit, register, errors } = useForm({});
  const [voitures, setVoiture] = React.useState([])

  useEffect(() => {
    listeVoitures()
  }, [])

  const listeVoitures = () => {
    ListeVoiture().then((res) => {
      setVoiture(res.data.data)
    })
  }
  //is-active

  const handleClick = () => {
    setActive('')
    //  setActiveliste('')
  }
  const handleClick2 = () => {
    // setActive('')
    setActiveliste('')
  }
  const [title, setCommenatire] = React.useState('');
  const [idvoiture, setIdvoiture] = React.useState();
  const [listecommentiare, setListeCommentaire] = React.useState([]);
  const handleClickShow = (product) => {
    setIdvoiture(product._id)
    setActive('is-active')
    setActiveliste('')
    setCommenatire('Commenatire')
  }
  const handleClickShowCommentiare = (product) => {
    console.log(product)
    setCommenatire('Liste Commentaires')
    setActiveliste('is-active')
    setActive('')
    ListeCommenatireByVoiture(product._id).then((res) => {
      setListeCommentaire(res.data.data)
    })
  }
  function onSubmit(data) {

    data.voitureId = idvoiture
    AjouterCommenatire(data).then((res) => {
      toast.success("✔️Commenatire Ajouter avec succes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      setActive('')
    }).catch(e => {
      toast.error('❗ Vous n est pas authorizer', {
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
      <div className="hero is-primary">
        <div className="hero-body container">

          <h4 className="title">Products</h4>
        </div>

      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {voitures && voitures.length ? (
            voitures.map((product, index) => (
              <div className=" column is-half" key={index}>
                <div className="box">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-64x64">
                        <img
                          src={'http://localhost:3212/public/img/Voiture/' + product.photo}
                          alt={product.shortDesc}
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <b style={{ textTransform: "capitalize" }}>
                        {product.name}{" "}
                      </b>
                      <div>{product.shortDesc}</div>
                      {
                        localStorage.getItem('token') != null ?
                          <div className="is-clearfix">
                            <button
                              className="button is-small is-outlined is-primary   is-pulled-right"

                              onClick={() => handleClickShow(product, index)}
                            >
                              Add Commenatire
                            </button>
                          </div> : <div />
                      }

                      <br />
                      {localStorage.getItem('token') != null ?
                        <div className="is-clearfix">
                          <button
                            className="button is-small is-outlined is-primary   is-pulled-right" onClick={() => handleClickShowCommentiare(product)}
                          >
                            Show Commenatire
                          </button>
                        </div> : <div />

                      }

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
        {title === "Commenatire" ?
          <div class="modal" className={`modal ${active}`}>
            <div class="modal-background"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">{title}</p>
                  <button class="delete" aria-label="close" onClick={handleClick}></button>
                </header>
                <section class="modal-card-body">
                  <div className="field">
                    <label className="label" htmlFor="commentiare">Ajouter Commenatire: </label>
                    <input
                      className="input"
                      type="text"
                      name="commentiare"
                      {...register("commentiare")}
                      required
                    />
                  </div>
                </section>
                <footer class="modal-card-foot">
                  <button class="button is-success" type="submit" >Ajouter</button>
                  <button class="button" onClick={handleClick}>Cancel</button>
                </footer>
              </div>
            </form>
          </div> :


          <div class="modal" className={`modal ${activeliste}`}>
            <div class="modal-background"></div>
            <form >
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">{title}</p>
                  <button class="delete" aria-label="close" onClick={handleClick2}></button>
                </header>
                <section class="modal-card-body">
                  {listecommentiare.length == 0 ? 'No Commenatire' :

                    <ul>
                      {listecommentiare.map((item, index) => {

                        return <li key={index}>{item.userId.name } :{item.commentiare}</li>
                      })

                      }
                    </ul>

                  }
                </section>
                <footer class="modal-card-foot">
                  <button class="button" onClick={handleClick2}>Cancel</button>
                </footer>
              </div>
            </form>
          </div>
        }
      </div>

    </>
  );
};

