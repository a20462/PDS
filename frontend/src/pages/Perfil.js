import React, { useState, useEffect } from 'react';
import './Perfil.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    try {
      await axios.put(`http://localhost:2000/api/pedidos/${id}`, { verificado: true });
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Erro ao verificar o pedido:', error);
      alert('Erro ao verificar o pedido.');
    }
  };

  return (
    <div className="perfil">
      <div className="main-content">
        </div>
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div className="notification" key={index}>
              <h3>{`Pedido de Parceria: ${notification.nome}`}</h3>
              <p>{notification.descricao}</p>
              {currentUser.isAdmin && (
                <button onClick={() => handleVerify(notification._id)}>Feito</button>
              )}
            </div>
          ))}
        </div>
      </div>
  )
};

export default Perfil;
