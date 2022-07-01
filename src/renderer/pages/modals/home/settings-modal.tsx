import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { _update } from 'renderer/redux/slices/accumulation';
type Props = {
  show: boolean;
  onHide: () => void;
  data: any;
};
const SettingsModal: FC<Props> = ({ data, show, onHide }) => {
  const dispatch = useDispatch();

  const dismiss = () => onHide();

  const [imprtData, setImprtData] = useState(null);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'birikim.json';

    link.click();
  };
  const importData = (e: any) => {
    document.getElementById('my_file').click();
  };

  const jsonData = (e: any) => {
    if (e.target.files.length > 0) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (event: any) {
        var data = JSON.parse(event.target.result);
        dispatch(_update(data));
        toast.success('Veriler başarıyla içe aktarıldı.');
      };
      reader.readAsText(file);
    } else {
      toast.warning('Lütfen geçerli bir dosya ekleyin.');
    }
  };
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="fs-5 fw-bold text-black"
          >
            Verileri İçe / Dışa Aktar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label mb-4">
            Lütfen işlem yapmak istediğiniz işlemi seçin
          </label>
          <div className="row">
            <div className="col-md-6">
              <div
                className=" bg-primary  text-white d-flex align-items-center justify-content-center shadow"
                style={{ height: '150px', borderRadius: 10, cursor: 'pointer' }}
                onClick={exportData}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  style={{ width: 50, height: 50 }}
                  className="me-2"
                >
                  <path
                    fill="white"
                    d="M192 312C192 298.8 202.8 288 216 288H384V160H256c-17.67 0-32-14.33-32-32L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-128H216C202.8 336 192 325.3 192 312zM256 0v128h128L256 0zM568.1 295l-80-80c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L494.1 288H384v48h110.1l-39.03 39.03C450.3 379.7 448 385.8 448 392s2.344 12.28 7.031 16.97c9.375 9.375 24.56 9.375 33.94 0l80-80C578.3 319.6 578.3 304.4 568.1 295z"
                  />
                </svg>
                <label className="fw-bold">Verileri Dışar Aktar</label>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="bg-success text-white d-flex align-items-center justify-content-center shadow"
                style={{ height: '150px', borderRadius: 10, cursor: 'pointer' }}
                onClick={importData}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ width: 50, height: 50 }}
                  className="me-2"
                >
                  <path
                    fill="white"
                    d="M384 0v128h128L384 0zM352 128L352 0H176C149.5 0 128 21.49 128 48V288h174.1l-39.03-39.03c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0l80 80c9.375 9.375 9.375 24.56 0 33.94l-80 80c-9.375 9.375-24.56 9.375-33.94 0C258.3 404.3 256 398.2 256 392s2.344-12.28 7.031-16.97L302.1 336H128v128C128 490.5 149.5 512 176 512h288c26.51 0 48-21.49 48-48V160h-127.1C366.3 160 352 145.7 352 128zM24 288C10.75 288 0 298.7 0 312c0 13.25 10.75 24 24 24H128V288H24z"
                  />
                </svg>
                <label className="fw-bold">Verileri İçe Aktar</label>
                <input
                  type="file"
                  className="my_file"
                  id="my_file"
                  accept="application/JSON"
                  onChange={jsonData}
                ></input>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={dismiss}>Kapat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsModal;
