import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Auth() {
  let navigate = useNavigate();
  const login = (event: any) => {
    event.preventDefault();
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: 'Lütfen Bekleyin...',
      success: 'Giriş Başarılı 👌',
      error: 'Bir Sorun Oluştu 🤯',
    });
    setTimeout(()=>navigate('/home'), 1200);

  };


  return (
    <div className="bg-dark d-flex min-vh-100 d-inline-block align-items-center justify-content-center text-white">
      <div>
        <div className="w-100 text-center">
          <span className="fw-bold fs-1">
            BİRİ<span className="text-primary ">KİM</span>
          </span>
        </div>
        <form className="mt-5" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Eğer kullanıcı adını unuttuysanız şuan birşey yapamayız :)
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Şifre
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Beni Hatırla
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Giriş
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
