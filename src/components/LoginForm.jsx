/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formErrorCount, setFormErrorCount] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!user.trim()) {
      newErrors.user = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(user)) {
      newErrors.user = 'Ingresa un correo electrónico válido.';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormErrorCount((prev) => prev + 1);
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
      className="container-fluid min-vh-100 overflow-auto bg-light d-flex align-items-center justify-content-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="row w-100">
        {/* Formulario */}
        <div className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center p-3 p-md-5">
          <img src={logo} alt="logo" className="mb-4" style={{ maxWidth: 200 }} />

          <motion.div
            key={formErrorCount}
            className="card shadow rounded p-4 w-100"
            style={{ maxWidth: 400 }}
            animate={Object.keys(errors).length > 0 ? { x: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <h4 className="mb-4">Iniciar sesión</h4>

            <form onSubmit={handleSubmit}>
              {/* Campo de email */}
              <div className="mb-3">
                <label className="form-label">Correo electrónico:</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary bg-opacity-10 border-end-0">
                    <User size={16} className="text-primary" />
                  </span>
                  <input
                    type="email"
                    className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <AnimatePresence>
                  {errors.user && (
                    <motion.div
                      className="text-danger small mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {errors.user}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Campo de contraseña */}
              <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary bg-opacity-10 border-end-0">
                    <Lock size={16} className="text-primary" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                  />
                  <span
                    className="input-group-text bg-primary bg-opacity-10 border-start-0"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} className="text-primary" /> : <Eye size={16} className="text-primary" />}
                  </span>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.div
                      className="text-danger small mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {errors.password}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón */}
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

          {/* Footer */}
          <footer className="mt-4 text-center text-muted small">
            &copy; {new Date().getFullYear()} JMM Asesores. Todos los Derechos Reservados.
          </footer>
        </div>

        {/* Imagen lateral solo en pantallas medianas o mayores */}
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