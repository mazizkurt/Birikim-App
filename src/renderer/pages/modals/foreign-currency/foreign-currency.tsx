import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { _update } from 'renderer/redux/slices/accumulation';
import { getAltin, getDolar } from 'renderer/services';
type Props = {
  show: boolean;
  onHide: () => void;
};
const ForeignCurrencyModal: FC<Props> = ({ show, onHide }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dismiss = () => onHide();
  console.log(allData);
  useEffect(() => {
    Promise.all([getAltin(), getDolar()]).then((res) => {
      var data = res[0].data.concat(res[1].data);
      setAllData(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        show={show}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="fs-5 fw-bold text-black"
          >
            Güncel Kur Bilgileri
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="row overflow-auto invisible-scrollbar1"
            style={{ height: 350 }}
          >
            {!loading ? (
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Kodu</th>
                    <th scope="col">Alış</th>
                    <th scope="col">Satış</th>
                    <th scope="col">Gncl. Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((data:any, index:any) => (
                    <tr tabIndex={index}>
                      <td>{data?.Aciklama}</td>
                      <td>{data?.Alis}</td>
                      <td>{data?.Satis}</td>
                      <td>{data?.GuncellenmeZamani}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-100 text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={dismiss}>Kapat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForeignCurrencyModal;
