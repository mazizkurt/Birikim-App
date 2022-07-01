import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from 'renderer/redux/app/store';
import { _add, _remove } from 'renderer/redux/slices/accumulation';
import ForeignCurrencyModal from '../modals/foreign-currency/foreign-currency';
import SettingsModal from '../modals/home/settings-modal';

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

  const [settingsModal, setSettingModal] = useState(false);
  const [foreignCurrencyModal, setForeignCurrencyModal] = useState(false);

  const add = (event: any) => {
    event.preventDefault();
    if (accType !== '')
      if (purchasePrice.length > 0)
        if (purchaseDate.length > 0) {
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
        } else toast.warning('Lütfen tarih giriniz');
      else toast.warning('Lütfen fiyat giriniz');
    else toast.warning('Lütfen birikim tipi giriniz');
  };
  return (
    <>
      <div
        className="container-fluid position-relative bg-dark  w-100 text-white p-5"
        style={{ height: '100vh' }}
      >
        <div className="position-absolute top-0 end-0 me-3 mt-3">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-success text-white btn-sm me-2"
              onClick={() => setForeignCurrencyModal(!foreignCurrencyModal)}
            >
              Güncel Kurlar
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setSettingModal(!settingsModal)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-6 col-md-6 col-lg-6 ">
            <div className="d-flex align-items-center justify-content-between">
              <div className="fw-bolder fs-5 text-primary">
                Toplam Birikimler
              </div>
              <div className="text-whiter">
                {' '}
                {Intl.NumberFormat('tr-Tr').format(
                  accumulation.accumulation.length > 0
                    ? accumulation.accumulation.reduce(
                        (partialSum: any, a: any) =>
                          partialSum + parseFloat(a.purchasePrice),
                        0
                      )
                    : null
                )}
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
                    <div
                      className="d-flex mt-3 align-items-center justify-content-between  px-3"
                      key={index}
                    >
                      <div className="w-75 ">
                        <div className="fw-bold text-danger fs-5">
                          {data.accType}
                        </div>
                        <div
                          className="text-bolder text-whiter text-break mr-2 "
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
                      <div className="flex-column d-flex justif-content-between h-100 w-25">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-whiter mb-3 float-end "
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              dispatch(
                                _remove({ accumulation: { id: index } })
                              );
                              toast.success('Başarıyla silindi.');
                            }}
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
                          {Intl.NumberFormat('tr-Tr').format(
                            data.purchasePrice
                          )}{' '}
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
              <div className="fw-bolder fs-5 mb-3 text-primary">
                Birikim Ekle
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Birikim Tipi</label>
                <select
                  className="form-select"
                  onChange={(e) => setAccType(e.target.value)}
                >
                  <option value={''}>Seçiniz</option>
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
                  type={'number'}
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
      <SettingsModal
        show={settingsModal}
        onHide={() => setSettingModal(!settingsModal)}
        data={accumulation}
      />
      <ForeignCurrencyModal
        show={foreignCurrencyModal}
        onHide={() => setForeignCurrencyModal(!foreignCurrencyModal)}
      />
    </>
  );
}

export default Home;
