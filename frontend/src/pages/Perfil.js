const Perfil = () => {

    return (
      <div style={styles.perfil}>
        <header style={styles.header}>
          <div style={styles.logo}>SCF</div>
          <nav style={styles.nav}>
            <a href="#viatura" style={styles.navLink}>Viatura</a>
            <a href="#oficinas" style={styles.navLink}>Oficinas</a>
            <a href="#suporte" style={styles.navLink}>Suporte</a>
            <a href="#sobre-nos" style={styles.navLink}>Sobre Nos</a>
          </nav>
        </header>
        <div style={styles.mainContent}>
          <div style={styles.userInfo}>
            <div style={styles.userDetails}>
              <div style={styles.userInfoItem}>Nome:</div>
              <div style={styles.userInfoItem}>Email:</div>
              <div style={styles.userInfoItem}>Telemovel:</div>
            </div>
            <div style={styles.userAddress}>
              <div style={styles.userInfoItem}>Morada:</div>
              <div style={styles.userInfoItem}>Codigo Postal:</div>
            </div>
          </div>

            </div>
          </div>
    );
  };
  
  export default Perfil;