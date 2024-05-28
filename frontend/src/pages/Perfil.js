import React, { useState, useEffect } from 'react';
import './Perfil.css';
import axios from 'axios';

const Perfil = ({ currentUser }) => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    date: '',
    telemovel: '',
    nif: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/api/clientes/${currentUser.id}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados do cliente:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/pedidos');
        setNotifications(response.data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (!currentUser || !currentUser.id) {
      console.error('Erro: usuário não está definido ou não possui um ID.');
      alert('Erro: usuário não está definido ou não possui um ID.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:2000/api/clientes/${currentUser.id}`, userData);
      if (response.data.msg === "Cliente atualizado com sucesso!") {
        alert('Dados salvos com sucesso!');
        setIsEditing(false); 
      } else {
        alert('Erro ao salvar os dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao salvar os dados.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleVerify = async (id) => {
    // Lógica para marcar o pedido como verificado
    console.log(`Pedido verificado: ${id}`);
    // Remover o pedido verificado
    setNotifications(notifications.filter(notification => notification._id !== id));
  };

  return (
    <div className="perfil">
      <div className="main-content">
        <div className="user-info">
          <div className="user-details">
            {isEditing ? (
              <>
                <div className="user-info-item">
                  <label>Nome:</label>
                  <input type="text" name="nome" value={userData.nome} onChange={handleChange} />
                </div>
                <div className="user-info-item">
                  <label>Email:</label>
                  <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="user-info-item">
                  <label>Data de Nascimento:</label>
                  <input type="date" name="date" value={userData.date} onChange={handleChange} />
                </div>
                <div className="user-info-item">
                  <label>Telemovel:</label>
                  <input type="tel" name="telemovel" value={userData.telemovel} onChange={handleChange} />
                </div>
                <div className="user-info-item">
                  <label>NIF:</label>
                  <input type="text" name="nif" value={userData.nif} onChange={handleChange} />
                </div>
                <button className="save-button" onClick={handleSave}>Salvar</button>
              </>
            ) : (
              <>
                <div className="user-info-item">
                  <label>Nome:</label>
                  <p>{userData.nome}</p>
                </div>
                <div className="user-info-item">
                  <label>Email:</label>
                  <p>{userData.email}</p>
                </div>
                <div className="user-info-item">
                  <label>Data de Nascimento:</label>
                  <p>{userData.date}</p>
                </div>
                <div className="user-info-item">
                  <label>Telemovel:</label>
                  <p>{userData.telemovel}</p>
                </div>
                <div className="user-info-item">
                  <label>NIF:</label>
                  <p>{userData.nif}</p>
                </div>
                <button className="edit-button" onClick={handleEdit}>Editar</button>
              </>
            )}
          </div>
        </div>
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div className="notification" key={index}>
              <h3>{`Pedido de Parceria: ${notification.nome}`}</h3>
              <p>{notification.descricao}</p>
              <button onClick={() => handleVerify(notification._id)}>Verificado</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
