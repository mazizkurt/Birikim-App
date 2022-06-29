import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/app/store';
import { _add, _remove } from 'renderer/redux/slices/accumulation';

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
        <div className="col-sm-6 col-md-6 col-lg-6 ">
          <div className="d-flex align-items-center justify-content-between">
            <div className="fw-bolder fs-5 text-primary">Toplam Birikimler</div>
            <div className="text-whiter">
              {' '}
              {Intl.NumberFormat('tr-Tr').format(
                accumulation.accumulation.reduce(
                  (partialSum: any, a: any) =>
                    partialSum + parseFloat(a.purchasePrice),
                  0
                )
              )}{' '}
              TL
            </div>
          </div>

          <div
            className="mb-3 overflow-auto invisible-scrollbar"
            style={{ height: '85vh' }}
          >
            {accumulation.accumulation.length > 0 ? (
              accumulation.accumulation.map((data: any, index: any) => (
                <>
                  <div className="d-flex mt-3 align-items-center justify-content-between  px-3">
                    <div className="w-75 ">
                      <div className="fw-bold text-danger fs-5">
                        {data.accType}
                      </div>
                      <div
                        className="text-bolder text-whiter "
                        style={{ fontSize: 13 }}
                      >
                        Not: {data.purchaseNote}
                      </div>
                      <div
                        className="text-bolder text-muted"
                        style={{ fontSize: 13 }}
                      >
                        {data.purchaseDate}
                      </div>
                    </div>
                    <div className="flex-column d-flex justif-content-between h-100">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          className="text-whiter mb-3 float-end "
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            dispatch(_remove({ accumulation: { id: index } }))
                          }
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </div>
                      <div
                        className="fw-bold text-danger "
                        style={{ fontSize: 15 }}
                      >
                        {Intl.NumberFormat('tr-Tr').format(data.purchasePrice)}{' '}
                        TL
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))
            ) : (
              <div className=" text-whiter d-flex align-items-center justify-content-center mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="me-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
                <div>Henüz bir birikim eklemedin.</div>
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 px-5">
          <form onSubmit={add}>
            <div className="fw-bolder fs-5 mb-3 text-primary">Birikim Ekle</div>
            <div className="mb-3">
              <label className="form-label fw-bold">Birikim Tipi</label>
              <select
                className="form-select"
                onChange={(e) => setAccType(e.target.value)}
              >
                <option>Seçiniz</option>
                <option value={'Dolar'}>Dolar</option>
                <option value={'Euro'}>Euro</option>
                <option value={'Sterlin'}>Sterlin</option>
                <option value={'Gram Altın'}>Gram Altın</option>
                <option value={'Çeyrek Altın'}>Çeyrek Altın</option>
                <option value={'Yarım Altın'}>Yarım Altın</option>
                <option value={'Tam Altın'}>Tam Altın</option>
                <option value={'Cumhuriyet Altını'}>Cumhuriyet Altını</option>
                <option value={'Reşat Altını'}>Reşat Altını</option>
                <option value={'Kulplu Reşat Altını'}>
                  Kulplu Reşat Altını
                </option>
                <option value={'22 Ayar Altın TL/Gr'}>
                  22 Ayar Altın TL/Gr
                </option>
                <option value={'18 Ayar Altın TL/Gr'}>
                  18 Ayar Altın TL/Gr
                </option>
                <option value={'14 Ayar Altın TL/Gr'}>
                  14 Ayar Altın TL/Gr
                </option>
                <option value={'22 Ayar Bilezik'}>22 Ayar Bilezik</option>
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
