/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formErrorCount, setFormErrorCount] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!user) newErrors.user = 'El usuario es obligatorio.';
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormErrorCount(prev => prev + 1); // Disparar shake
    } else {
      setErrors({});
      setLoading(true);
      setTimeout(() => {
        console.log({ user, password });
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="row w-100">
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-5">
          <img src={logo} alt="logo" className="mb-4" style={{ maxWidth: 250 }} />
          <motion.div
            key={formErrorCount}
            className="card shadow rounded p-4 w-100"
            style={{ maxWidth: 400 }}
            animate={errors && Object.keys(errors).length > 0 ? { x: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <h4 className="mb-4">Iniciar sesión</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario:</label>
                <input
                  type="text"
                  className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                {errors.user && <div className="invalid-feedback">{errors.user}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3 text-end">
                <a href="#" className="text-muted small">¿Olvidaste tu contraseña?</a>
              </div>
              {loading ? (
                <button className="btn btn-primary w-100" disabled>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Ingresando...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
              )}
            </form>
          </motion.div>
          {/* FOOTER */}
  <footer className="mt-4 text-center text-muted small">
    &copy; {new Date().getFullYear()} JMM Asesores. Todos los Derechos Reservados.
  </footer>
        </div>
        <div className="col-md-7 d-none d-md-block p-0">
          <div
            className="h-100"
            style={{
              backgroundImage: 'url(/images/bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
