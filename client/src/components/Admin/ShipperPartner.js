import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalPopup from '../Common/Modal';
import AlertMessage from '../Common/Alert';
import search from '../../assets/img/search.png';
import { PartnerContext } from '../../contexts/PartnerContext';

export default function ShipperPartner() {
    const { partnerState: { shippers }, getShippers, getShipperById, deleteShipperById } = useContext(PartnerContext)
    const [needRender, setNeedRender] = useState(false);
    useEffect(() => {
        getShippers();
    }, [])

    useEffect(() => {
        getShippers();
    }, [needRender])

    const [partnerId, setPartnerId] = useState();
    const [alert, setAlert] = useState(null);
    const [partnerById, setPartnerById] = useState(null);
    const [partner, setPartner] = useState({
        shipper_id: '',
        full_name: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        identity_number: '',
        address: '',
        road_name: '',
        apartment_number: '',
        driver_license: '',
        bank_account_number: '',
        bank_name: ''
    });

    useEffect(() => {
        handleFetchPartnerById();
    }, [partnerById]);

    const handleFetchPartnerById = async () => {
        if (partnerById !== null) {
            await partnerById.map(p => {
                setPartner(p);
            })
            handleConvertBase64();
        } else {
            setPartner({
                shipper_id: '',
                full_name: '',
                phone: '',
                gender: '',
                date_of_birth: '',
                identity_number: '',
                address: '',
                road_name: '',
                apartment_number: '',
                driver_license: '',
                bank_account_number: '',
                bank_name: ''
            })
        }
    }
    const handleConvertBase64 = async () => {
        console.log("partner: ", partner);
        document.getElementById('frontIdentity').setAttribute('src', `data:image/jpg;base64,${partner.front_identity}`);
        document.getElementById('behindIdentity').setAttribute('src', `data:image/jpg;base64,${partner.behind_identity}`);
        document.getElementById('frontDriver').setAttribute('src', `data:image/jpg;base64,${partner.front_license}`);
        document.getElementById('behindDriver').setAttribute('src', `data:image/jpg;base64,${partner.behind_license}`);
        document.getElementById('covidTest').setAttribute('src', `data:image/jpg;base64,${partner.vaccine_cer}`);
    }

    const handleSearchClick = async (e) => {
        e.preventDefault();
        try {
            const object = await getShipperById(partnerId);
            if (object.status === false) {
                setAlert({ type: 'danger', message: object.message });
                setTimeout(() => setAlert(null), 3000);
            } else {
                setPartnerById(object);
            }
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteShipperById(partnerId);
            if (response) {
                setAlert({ type: 'success', message: '??a?? xo??a th??ng tin ng??????i giao h????!' });
                setTimeout(() => setAlert(null), 3000);
                setNeedRender(!needRender);
            } else {
                setAlert({ type: 'danger', message: 'Ma?? ??????i ta??c kh??ng h????p l????' });
                setTimeout(() => setAlert(null), 3000);
            }
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    return (
        <div className="shipper-partner">
            <Table striped bordered hover style={{ fontSize: '15px', marginTop: '30px' }} >
                <thead>
                    <tr><th colSpan="10">DANH SA??CH ??????I TA??C GIAO H????</th></tr>
                    <tr style={{ fontSize: '11.8px' }} >
                        <th>MA?? ??????I TA??C</th>
                        <th>??I??A CHI?? EMAIL</th>
                        <th>HO?? VA?? T??N</th>
                        <th>S??T</th>
                        <th>GI????I TI??NH</th>
                        <th>CMND/CCCD</th>
                        <th>??I??A CHI??</th>
                        <th>GPLX</th>
                        <th>STK</th>
                        <th>T??N NG??N HA??NG</th>
                    </tr>
                </thead>
                <tbody>
                    {shippers.map(shipper => {
                        return (
                            <tr key={shipper.id}>
                                <td>{shipper.shipper_id}</td>
                                <td>{shipper.email}</td>
                                <td>{shipper.full_name}</td>
                                <td>{shipper.phone}</td>
                                <td>{shipper.gender}</td>
                                <td>{shipper.identity_number}</td>
                                <td>{shipper.address}</td>
                                <td>{shipper.driver_license}</td>
                                <td>{shipper.bank_account_number}</td>
                                <td>{shipper.bank_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Form>
                <AlertMessage info={alert} />
                <div className="mb-3 search">
                    <label style={{ fontWeight: 'bold' }}>Ma?? ??????i ta??c</label>
                    <input type="text" name="partnerId" className="inputArea" onChange={(e) => setPartnerId(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="primary" type="submit" onClick={handleSearchClick}>
                        Xem chi ti????t
                    </Button>
                </div>
            </Form>
            <div>
                <p className='detail'>Th??ng tin chi ti????t</p>
                <Form>
                    <div className="form-update">
                        <div className="form-left">
                            <p className="title">Th??ng tin ng??????i giao h????</p>
                            <div className="mb-3 disable-input">
                                <label>1. Ma?? ??????i ta??c</label>
                                <input type="text" className="inputArea" defaultValue={partner.shipper_id} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>2. Ho?? va?? t??n</label>
                                <input type="text" className="inputArea" defaultValue={partner.full_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>3. S???? ??i????n thoa??i</label>
                                <input type="text" className="inputArea" defaultValue={partner.phone} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>4. Gi????i ti??nh</label>
                                <input type="text" className="inputArea" defaultValue={partner.gender} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>5. Nga??y sinh</label>
                                <input type="text" className="inputArea" defaultValue={partner.date_of_birth} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>6. CMND/CCCD</label>
                                <input type="text" className="inputArea" defaultValue={partner.identity_number} />
                            </div>
                            <div className="mb-3">
                                <label>- M????t tr??????c CMND/CCCD</label><br />
                                <img id="frontIdentity" className="img-preview" />
                            </div>
                            <div className="mb-3">
                                <label>- M????t sau CMND/CCCD</label><br />
                                <img id="behindIdentity" className="img-preview" />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>7. ??i??a chi??</label>
                                <input type="text" className="inputArea" defaultValue={partner.address} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>8. ????????ng</label>
                                <input type="text" className="inputArea" defaultValue={partner.road_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>9. S???? nha??</label>
                                <input type="text" className="inputArea" defaultValue={partner.apartment_number} />
                            </div>
                        </div>
                        <div className="form-right">
                            <p className="title">Th??ng tin c????n thi????t</p>
                            <div className="mb-3 disable-input">
                                <label>1. Gi????y phe??p la??i xe ha??ng A1/A2</label>
                                <input type="text" className="inputArea" defaultValue={partner.driver_license} />
                            </div>
                            <div className="mb-3">
                                <label>- M????t tr??????c GPLX</label><br />
                                <img id="frontDriver" className="img-preview" />
                            </div>
                            <div className="mb-3">
                                <label>- M????t sau GPLX</label><br />
                                <img id="behindDriver" className="img-preview" />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>2. S???? ta??i khoa??n</label>
                                <input type="text" className="inputArea" defaultValue={partner.bank_account_number} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>3. T??n ng??n ha??ng</label>
                                <input type="text" className="inputArea" defaultValue={partner.bank_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>4. Ch????ng nh????n ti??m chu??ng vaccine</label><br />
                                <img id="covidTest" className="img-preview" />
                            </div>
                        </div>
                    </div>
                    <Button variant="danger" type="submit" onClick={(e) => handleDelete(e)}>
                        Xo??a vi??nh vi????n
                    </Button>
                </Form>
            </div>
        </div >
    )
}
