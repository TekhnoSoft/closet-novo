import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { AccountModal, Button, Checkbox, Container, FragmentView, Input, Modal, Radiobox, Ship, SpaceBox } from '../../components';  // Ajuste o caminho conforme necessário
import Utils from '../../Utils';
import { MainContext } from '../../helpers/MainContext';
import Api from '../../Api';

const TabContent = ({ tab }) => {

    const { user, logout } = useContext(MainContext);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const [products, setProducts] = useState([]);
    const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const emptyFormDataAddress = {
        name: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
    }

    const [formDataAddress, setFormDataAddress] = useState(emptyFormDataAddress);
    const [showModalAddress, setShowModalAddress] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [showAddressDeleteModal, setShowAddressDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        loadMyProducts();
        loadMyAddresses();
    }, [])

    useEffect(() => {
        if (formDataAddress.cep.length === 9) {
            fetchAddress();
        }
    }, [formDataAddress.cep]);

    const loadMyProducts = async () => {
        setProducts([]);
        let token = Utils.getClientToken();
        await Api.user.myProducts({ forceToken: token }).then(async data => {
            setProducts(data?.data);
        })
    }

    const handleChangePassword = async () => {

        if (oldPassword?.length <= 0) {
            Utils.toast({ type: "error", text: "Digite sua senha atual." })
            return;
        }

        if (newPassword?.length <= 0) {
            Utils.toast({ type: "error", text: "Digite sua nova senha." })
            return;
        }

        if (conPassword?.length <= 0) {
            Utils.toast({ type: "error", text: "Confirme sua nova senha." })
            return;
        }

        if (!Utils.validatePassword(newPassword)) {
            Utils.toast({ type: "error", text: "A senha precisa ter letras, números e caracteres." })
            return;
        }

        if (newPassword != conPassword) {
            Utils.toast({ type: "error", text: "As senhas não se coincidem." })
            return;
        }

        let token = Utils.getClientToken();
        await Api.user.changePassword({ forceToken: token, oldPassword: oldPassword, newPassword: newPassword }).then(async data => {
            if (data?.data?.success) {
                Utils.toast({ type: "success", text: data?.data?.message });
                setOldPassword("");
                setNewPassword("");
                setConPassword("");
            } else {
                Utils.toast({ type: "error", text: data?.data?.message });
            }
        })

    }

    const handleLogout = () => {
        logout(true);
    }

    const handleDeleteProductModalShow = async (product) => {
        setSelectedProduct(product);
        setShowProductDeleteModal(true);
    }

    const handleDeleteProductCancel = () => {
        setSelectedProduct(null);
        setShowProductDeleteModal(false);
    }

    const onCloseModalDeleteProduct = () => {
        setSelectedProduct(null);
    }

    const handleDeleteProductConfirm = async () => {
        let token = Utils.getClientToken();
        await Api.user.deleteMyProduct({ forceToken: token, id: selectedProduct.id }).then(async data => {
            Utils.toast({ type: data?.data?.success == true ? "success" : "error", text: data?.data?.message });
            if (data?.data?.success) {
                setSelectedProduct(null);
                setShowProductDeleteModal(false);
                loadMyProducts();
            } else {
                setSelectedProduct(null);
                setShowProductDeleteModal(false);
            }
        })
    }

    const getBorderByStatus = (status) => {
        switch (status) {
            case "A":
                return "solid 3px #5e8975";
            case "E":
                return "solid 3px #FFC107";
            case "R":
                return "solid 3px #F44336";
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "A":
                return "Aprovado";
            case "E":
                return "Em revisão";
            case "R":
                return "Reprovado";
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "A":
                return "green";
            case "E":
                return "orange";
            case "R":
                return "red";
        }
    }

    const handleChangeAddress = (field, value) => {
        setFormDataAddress({ ...formDataAddress, [field]: value });
    };

    const fetchAddress = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${formDataAddress.cep.replace("-", "")}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setFormDataAddress({
                    ...formDataAddress,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                });
            } else {
                Utils.toast({ type: "error", text: 'CEP não encontrado!' });
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            Utils.toast({ type: "error", text: 'Erro ao buscar o CEP!' });
        }
    };

    const handleShowModalAddress = () => {
        setShowModalAddress(true);
    }

    const handleRegisterAddressCancel = async () => {
        setShowModalAddress(false);
    }

    const handleRegisterAddressOk = async () => {
        if (formDataAddress.name.trim()?.length <= 0) {
            Utils.toast({ type: "error", text: "Digite o nome do endereço." });
            return;
        }

        if (Utils.validateFormDataRegister({ step: 2, formData: formDataAddress })) {
            let token = Utils.getClientToken();
            await Api.user.addAddress({ forceToken: token, data: formDataAddress }).then(async data => {
                Utils.toast({ type: data?.data?.success == true ? "success" : "error", text: data?.data?.message });
                if (data?.data?.success) {
                    setShowModalAddress(false);
                    setFormDataAddress(emptyFormDataAddress);
                    loadMyAddresses();
                }
            })
        }
    }

    const loadMyAddresses = async () => {
        setAddresses([]);
        let token = Utils.getClientToken();
        await Api.user.myAddresses({ forceToken: token }).then(async data => {
            setAddresses(data?.data?.data);
        })
    }

    const handleDeleteAddressCancel = () => {
        setShowAddressDeleteModal(false);
    }

    const onCloseModalDeleteAddress = () => {
        setSelectedAddress(null);
    }

    const handleDeleteAddressModalShow = (address) => {
        setSelectedAddress(address);
        setShowAddressDeleteModal(true);
    }

    const handleDeleteAddressConfirm = async () => {
        let token = Utils.getClientToken();
        await Api.user.deleteMyAddress({ forceToken: token, id: selectedAddress.id }).then(async data => {
            Utils.toast({ type: data?.data?.success == true ? "success" : "error", text: data?.data?.message });
            if (data?.data?.success) {
                setSelectedAddress(null);
                setShowAddressDeleteModal(false);
                loadMyAddresses();
            } else {
                setSelectedAddress(null);
                setShowAddressDeleteModal(false);
            }
        })
    }

    const handleSelectAddress = async (address) => {
        let token = Utils.getClientToken();
        await Api.user.switchAddress({ forceToken: token, id: address?.id }).then(async data => {
            Utils.toast({ type: data?.data?.success == true ? "success" : "error", text: data?.data?.message });
            if (data?.data?.success) {
                loadMyAddresses();
            }
        })
    }

    switch (tab) {
        case 'Perfil':
            return (
                <div className="tab-content">
                    <h3>Informações do Perfil</h3>

                    <div className="profile-card">
                        <h4 style={{ marginTop: 0 }}>Meus Dados</h4>
                        <div className="profile-info">
                            <p><strong>Nome:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Celular:</strong> {Utils.formatCelular(user?.phone)}</p>
                            <p><strong>CPF:</strong> {Utils.formatCPF(user?.cpf)}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button style={{ background: '#fff', border: 'solid 1px red', color: 'red', height: '40px' }} onClick={handleLogout}>&nbsp;&nbsp;Desconectar&nbsp;&nbsp;</Button>
                        </div>
                    </div>

                    <div className="password-card">
                        <h4 style={{ marginTop: 0 }}>Atualizar Senha</h4>
                        <div className='form-password'>
                            <div className="input-group">
                                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', border: 'solid 1px #ddd', marginRight: '-2px' }}>
                                    &nbsp;<ion-icon name="lock-closed-outline"></ion-icon>&nbsp;
                                </div>
                                <Input setValue={setOldPassword} value={oldPassword} hideInputBoxMargin type={"password"} label={"Digite sua senha atual"} style={{ width: '100%' }} />
                            </div>
                            <div className="input-group">
                                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', border: 'solid 1px #ddd', marginRight: '-2px' }}>
                                    &nbsp;<ion-icon name="lock-closed-outline"></ion-icon>&nbsp;
                                </div>
                                <Input setValue={setNewPassword} value={newPassword} hideInputBoxMargin type={"password"} label={"Nova Senha"} style={{ width: '100%' }} />
                            </div>
                            <div className="input-group">
                                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', border: 'solid 1px #ddd', marginRight: '-2px' }}>
                                    &nbsp;<ion-icon name="lock-closed-outline"></ion-icon>&nbsp;
                                </div>
                                <Input setValue={setConPassword} value={conPassword} hideInputBoxMargin type={"password"} label={"Confirmar Senha"} style={{ width: '100%' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <Button onClick={handleChangePassword}>&nbsp;&nbsp;Atualizar Senha&nbsp;&nbsp;</Button>
                            </div>
                        </div>
                    </div>
                    <SpaceBox space={30} />
                </div>
            );
        case 'Endereços':
            return (
                <>
                    <Modal setShow={setShowModalAddress} show={showModalAddress}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ion-icon name="location" style={{ color: '#5e8975', marginTop: 0 }}></ion-icon>&nbsp;
                            <h3 className='h3-account' style={{ margin: 0 }}>Adicionar Endereço</h3>
                        </div>
                        <SpaceBox space={10} />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="text" label="Nome (casa, trabalho)" value={formDataAddress.name} setValue={(value) => handleChangeAddress('name', value)} />&nbsp;&nbsp;
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="cep" label="CEP" value={formDataAddress.cep} setValue={(value) => handleChangeAddress('cep', value)} />
                        </div>
                        <Input type="text" label="Logradouro" value={formDataAddress.logradouro} setValue={(value) => handleChangeAddress('logradouro', value)} />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="number" label="Número" value={formDataAddress.numero} setValue={(value) => handleChangeAddress('numero', value)} />&nbsp;&nbsp;
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="text" label="Complemento" value={formDataAddress.complemento} setValue={(value) => handleChangeAddress('complemento', value)} />
                        </div>
                        <Input type="text" label="Bairro" value={formDataAddress.bairro} setValue={(value) => handleChangeAddress('bairro', value)} />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="text" label="Cidade" value={formDataAddress.cidade} setValue={(value) => handleChangeAddress('cidade', value)} />&nbsp;&nbsp;
                            <Input hideInputBoxMargin style={{ width: '100%' }} type="text" label="Estado" value={formDataAddress.estado} setValue={(value) => handleChangeAddress('estado', value)} />
                        </div>
                        <SpaceBox space={20} />
                        <div className="accont-button-group" style={{ justifyContent: !Utils?.mobileCheck() ? 'end' : undefined }}>
                            <Button onClick={handleRegisterAddressCancel} style={{ background: "#f5f5f5", color: "#5e8975" }} className="submit-button accont-button">&nbsp;&nbsp;&nbsp;Cancelar&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                            <Button onClick={handleRegisterAddressOk} className="submit-button accont-button">&nbsp;&nbsp;&nbsp;Salvar&nbsp;&nbsp;&nbsp;</Button>
                        </div>
                    </Modal>
                    <Modal setShow={setShowAddressDeleteModal} show={showAddressDeleteModal} onCloseCallback={onCloseModalDeleteAddress}>
                        <b>Deseja confirmar a remoção do endereço?</b>
                        <SpaceBox space={10} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button onClick={handleDeleteAddressCancel} style={{ height: '40px', background: "#f5f5f5", color: "#5e8975" }}>&nbsp;&nbsp;&nbsp;&nbsp;Não&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                            <Button onClick={handleDeleteAddressConfirm} style={{ height: '40px' }}>&nbsp;&nbsp;&nbsp;Sim&nbsp;&nbsp;&nbsp;</Button>
                        </div>
                    </Modal>
                    <div className="tab-content">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 >Meus Endereços</h3>
                            <button className="button-profile btn-new-address" onClick={handleShowModalAddress}>
                                <ion-icon name="add-circle-outline"></ion-icon><span>Novo Endereço</span>
                            </button>
                        </div>
                        <div className="address-list">
                            {addresses?.map(address => (
                                <div className="address-item" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => { handleSelectAddress(address) }}>
                                        <Radiobox checked={address?.selected == 1} setChecked={() => { return true }}>&nbsp;&nbsp;
                                            <div>
                                                <strong>{address?.name}</strong>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '8pt',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: Utils.mobileCheck() ? '200px' : '100%'
                                                }}>
                                                    {address?.city}-{address?.state}, {address?.number}{address?.complement} {address?.neighborhood}, {address?.street}
                                                </p>
                                            </div>
                                        </Radiobox>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <button className="button-profile btn-edit">
                                            <ion-icon name="pencil"></ion-icon>{Utils.mobileCheck() ? '' : ' Editar'}
                                        </button>&nbsp;
                                        <button onClick={() => { handleDeleteAddressModalShow(address) }} className="button-profile btn-remove">
                                            <ion-icon name="trash"></ion-icon>{Utils.mobileCheck() ? '' : ' Remover'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SpaceBox space={20} />
                    </div>
                </>
            );
        case 'Produtos':
            return (
                <>
                    <Modal setShow={setShowProductDeleteModal} show={showProductDeleteModal} onCloseCallback={onCloseModalDeleteProduct}>
                        <b>Deseja confirmar a remoção do produto?</b>
                        <SpaceBox space={10} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button onClick={handleDeleteProductCancel} style={{ height: '40px', background: "#f5f5f5", color: "#5e8975" }}>&nbsp;&nbsp;&nbsp;&nbsp;Não&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                            <Button onClick={handleDeleteProductConfirm} style={{ height: '40px' }}>&nbsp;&nbsp;&nbsp;Sim&nbsp;&nbsp;&nbsp;</Button>
                        </div>
                    </Modal>
                    <div className="tab-content">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3>Meus Produtos</h3>
                            <button className="button-profile btn-new-address">
                                <ion-icon name="add-circle-outline"></ion-icon><span>Novo Produto</span>
                            </button>
                        </div>
                        <div className="product-list-p">
                            {products?.map(product => (
                                <div className="product-item-p" style={{ borderLeft: getBorderByStatus(product?.status) }}>
                                    <div className="product-image-container">
                                        <img src={product?.images[0].path || "https://via.placeholder.com/100"} alt="Produto" className="product-image" />&nbsp;&nbsp;
                                        <div>
                                            {Utils?.mobileCheck() ? (
                                                <>
                                                    <p style={{ margin: 0, paddingBottom: '5px' }}><strong>{product?.name}</strong></p>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Ship noBorder dotStyle={getStatusColor(product?.status)}>{getStatusText(product?.status)}</Ship>&nbsp;
                                                        {product?.published == true ? (<Ship noBorder dotStyle={'blue'}>Publicado</Ship>) : product.status == "A" ? (<Ship noBorder dotStyle={'brown'}>Não publicado</Ship>) : (null)}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p><strong>{product?.name}</strong></p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="product-info-p">
                                        {!Utils?.mobileCheck() ? (
                                            <>
                                                <Ship noBorder dotStyle={getStatusColor(product?.status)}>{getStatusText(product?.status)}</Ship>&nbsp;
                                                {product?.published == true ? (<Ship noBorder dotStyle={'blue'}>Publicado</Ship>) : product.status == "A" ? (<Ship noBorder dotStyle={'brown'}>Não publicado</Ship>) : (null)}
                                            </>
                                        ) : (null)}
                                        {product?.status != "A" ? (
                                            <>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button className="button-profile btn-edit">
                                                    <ion-icon name="pencil"></ion-icon>{Utils.mobileCheck() ? '' : ' Editar'}
                                                </button>&nbsp;
                                                <button onClick={() => { handleDeleteProductModalShow(product) }} className="button-profile btn-remove">
                                                    <ion-icon name="trash"></ion-icon>{Utils.mobileCheck() ? '' : 'Remover'}
                                                </button>
                                            </>
                                        ) : (null)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SpaceBox space={20} />
                    </div>
                </>
            );
        default:
            return null;
    }
};

export default () => {
    const { user } = useContext(MainContext);

    const [showAccountModal, setShowAccountModal] = useState(false);

    const [activeTab, setActiveTab] = useState(localStorage.getItem("profile_navigation_index") || 'Perfil');

    useEffect(() => {
        let tab = localStorage.getItem("profile_navigation_index");
        if (tab) {
            setActiveTab(tab);
            localStorage.removeItem("profile_navigation_index");
        }
    }, [])

    const handleLogin = () => {
        setShowAccountModal(true);
    }

    return (
        <FragmentView noPaddingContainer>
            <Container center className="mt-2">
                {user ? (
                    <>
                        <div className="tabs">
                            <div
                                className={`tab ${activeTab === 'Perfil' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Perfil')}
                            >
                                <ion-icon name="person-outline"></ion-icon> Meu&nbsp;Perfil
                            </div>
                            <div
                                className={`tab ${activeTab === 'Produtos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Produtos')}
                            >
                                <ion-icon name="cart-outline"></ion-icon> Produtos
                            </div>
                            <div
                                className={`tab ${activeTab === 'Endereços' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Endereços')}
                            >
                                <ion-icon name="home-outline"></ion-icon> Endereços
                            </div>
                        </div>
                        <TabContent tab={activeTab} />
                    </>
                ) : (
                    <>
                        <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <SpaceBox space={20} />
                                <img src='../hero1.png' width={300} />
                                <p>Você não está logado.</p>
                                <SpaceBox space={5} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button className="checkout-button" onClick={handleLogin}>
                                        <b>&nbsp;&nbsp;&nbsp;Fazer Login&nbsp;&nbsp;&nbsp;</b>
                                    </Button>
                                </div>
                                <SpaceBox space={15} />
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </FragmentView>
    );
};
