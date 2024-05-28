import React, { useState, useEffect } from 'react';
import './Perfil.css';

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

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:2000/api/clientes/${currentUser.id}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Erro ao buscar dados do cliente:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (!currentUser || !currentUser.id) {
      console.error('Erro: usuário não está definido ou não possui um ID.');
      alert('Erro: usuário não está definido ou não possui um ID.');
      return;
    }

    const apiUrl = `http://localhost:2000/api/clientes/${currentUser.id}`;

    fetch(apiUrl, {
      method: 'PUT', // Assuming you're updating the existing user data
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg === "Cliente atualizado com sucesso!") {
          alert('Dados salvos com sucesso!');
          setIsEditing(false); // Switch to view mode after saving
        } else {
          alert('Erro ao salvar os dados.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar os dados.');
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
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
          <div className="notification">
            <h3>Pedido #xxxxxxxx</h3>
            <p>O carro encontra-se pronto para recolha</p>
          </div>
          <div className="notification">
            <h3>Pedido #xxxxxxxx</h3>
            <p>O serviço encontra-se concluído e pronto para recolha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
