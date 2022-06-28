import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/app/store';
import { _add } from 'renderer/redux/slices/accumulation';

function Home() {
  const dispatch = useDispatch();

  const accumulation: any = useSelector<RootState>(
    ({ accumulation }) => accumulation,
    shallowEqual
  );

  const [accType, setAccType] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseNote, setPurchaseNote] = useState('');

  console.log(accumulation);
  const add = (event: any) => {
    event.preventDefault();
    dispatch(
      _add({
        accumulation: {
          accType,
          purchasePrice,
          purchaseDate,
          purchaseNote,
        },
      })
    );
  };
  return (
    <div
      className="container-fluid bg-dark  w-100 text-white p-5"
      style={{ height: '100vh' }}
    >
      <div className="row ">
        <div
          className="col-sm-6 col-md-6 col-lg-6 overflow-auto"
          style={{ height: '90vh' }}
        >
          <div className="fw-bolder fs-5 text-primary border-bottom">
            Toplam Birikimler
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 px-5">
          <form onSubmit={add}>
            <div className="fw-bolder fs-5 mb-3 text-primary border-bottom">
              Birikim Ekle
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Birikim Tipi</label>
              <select
                className="form-select"
                onChange={(e) => setAccType(e.target.value)}
              >
                <option>Seçiniz</option>
                <option>Dolar</option>
                <option>Euro</option>
                <option>Sterlin</option>
                <option>Gram Altın</option>
                <option>Çeyrek Altın</option>
                <option>Yarım Altın</option>
                <option>Tam Altın</option>
                <option>Cumhuriyet Altını</option>
                <option>Reşat Altını</option>
                <option>Kulplu Reşat Altını</option>
                <option>22 Ayar Altın TL/Gr</option>
                <option>18 Ayar Altın TL/Gr</option>
                <option>14 Ayar Altın TL/Gr</option>
                <option>22 Ayar Bilezik</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Alış Fiyatı ( TL )</label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Alış fiyatı tl cinsinden"
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Alış Tarihi</label>
              <input
                type={'date'}
                className="form-control"
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Alış Notu</label>
              <textarea
                className="form-control"
                onChange={(e) => setPurchaseNote(e.target.value)}
                style={{ maxHeight: 100 }}
              ></textarea>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4">
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
