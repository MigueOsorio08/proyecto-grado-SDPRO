-- DROP database seguridad_vial_facial;
CREATE DATABASE IF NOT EXISTS seguridad_vial_facial
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE seguridad_vial_facial;

CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(60) NOT NULL ,
    descripcion VARCHAR(255)
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(120) NOT NULL,
    correo VARCHAR(120) NOT NULL,
    usuario VARCHAR(60) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    id_rol INT NOT NULL,
    fecha_creacion DATETIME,    
    CONSTRAINT fk_usuarios_roles
        FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE conductores (
    id_conductor INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento VARCHAR(30) NOT NULL,
    numero_documento VARCHAR(30) NOT NULL ,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(120),
    direccion VARCHAR(150),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    consentimiento_datos BOOLEAN DEFAULT FALSE,
    fecha_registro DATETIME
);

CREATE TABLE vehiculos (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    placa VARCHAR(15) NOT NULL ,
    marca VARCHAR(60),
    modelo VARCHAR(60),
    color VARCHAR(40),
    anio YEAR,
    tipo_vehiculo VARCHAR(60),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro DATETIME ,
    CONSTRAINT fk_vehiculos_conductores
        FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor)       
);

CREATE TABLE contactos_emergencia (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    nombre_contacto VARCHAR(120) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    parentesco VARCHAR(60),
    canal_notificacion ENUM('SMS', 'WhatsApp', 'Correo', 'Llamada') NOT NULL,
    correo VARCHAR(120),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro DATETIME ,
    CONSTRAINT fk_contactos_conductores
        FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor)        
);

CREATE TABLE perfiles_faciales (
    id_perfil_facial INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    id_vehiculo INT NOT NULL,
    ruta_imagen VARCHAR(255) NOT NULL,
    calidad_imagen DECIMAL(5,2),    
    observacion VARCHAR(255),
    fecha_registro DATETIME,
    CONSTRAINT fk_perfiles_conductores
        FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor),
    CONSTRAINT fk_perfiles_vehiculos
        FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo)        
);

CREATE TABLE camaras (
    id_camara INT AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo INT NOT NULL,
    nombre_dispositivo VARCHAR(100),
    descripcion VARCHAR(255),
    estado ENUM('Disponible', 'No disponible', 'En mantenimiento') DEFAULT 'Disponible',
    fecha_registro DATETIME ,
    CONSTRAINT fk_camaras_vehiculos
        FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo)        
);

CREATE TABLE sesiones_monitoreo (
    id_sesion INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    id_vehiculo INT NOT NULL,
    id_camara INT,
    fecha_inicio DATETIME NOT NULL ,
    fecha_fin DATETIME,
    estado ENUM('Activa', 'Finalizada', 'Cancelada', 'Error') DEFAULT 'Activa',
    camara_disponible BOOLEAN DEFAULT TRUE,
    rostro_detectado BOOLEAN DEFAULT FALSE,
    iluminacion_adecuada BOOLEAN DEFAULT TRUE,
    observacion VARCHAR(255),
    CONSTRAINT fk_sesiones_conductores
        FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor),      
    CONSTRAINT fk_sesiones_vehiculos
        FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
    CONSTRAINT fk_sesiones_camaras
        FOREIGN KEY (id_camara) REFERENCES camaras(id_camara)        
);

CREATE TABLE tipos_evento (
    id_tipo_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre_evento VARCHAR(80) NOT NULL ,
    descripcion VARCHAR(255),
    nivel_riesgo ENUM('Bajo', 'Medio', 'Alto', 'Crítico') NOT NULL
);

CREATE TABLE eventos_riesgo (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion INT NOT NULL,
    id_tipo_evento INT NOT NULL,
    fecha_evento DATETIME NOT NULL ,
    descripcion TEXT,    
    duracion_segundos DECIMAL(6,2),
    es_falsa_alarma BOOLEAN DEFAULT FALSE,
    captura_confiable BOOLEAN DEFAULT TRUE,
    condicion_iluminacion ENUM('Adecuada', 'Baja', 'Excesiva', 'Desconocida') DEFAULT 'Adecuada',
    posicion_rostro ENUM('Correcta', 'Parcial', 'No visible', 'Desconocida') DEFAULT 'Correcta',
    estado_evento ENUM('Detectado', 'En alerta', 'Escalado a emergencia', 'Atendido', 'Descartado') DEFAULT 'Detectado',
    CONSTRAINT fk_eventos_sesiones
        FOREIGN KEY (id_sesion) REFERENCES sesiones_monitoreo(id_sesion),
    CONSTRAINT fk_eventos_tipos
        FOREIGN KEY (id_tipo_evento) REFERENCES tipos_evento(id_tipo_evento)            
);

CREATE TABLE alertas_sonoras (
    id_alerta_sonora INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    fecha_alerta DATETIME NOT NULL ,
    tipo_sonido VARCHAR(80),
    volumen INT,
    resultado ENUM('Emitida', 'Fallida') NOT NULL,
    observacion VARCHAR(255),
    CONSTRAINT fk_alertas_sonoras_eventos
        FOREIGN KEY (id_evento) REFERENCES eventos_riesgo(id_evento)            
);

CREATE TABLE evidencias_visuales (
    id_evidencia INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    tipo_archivo ENUM('Imagen', 'Video', 'Fotograma') DEFAULT 'Imagen',
    fecha_captura DATETIME NOT NULL ,
    descripcion VARCHAR(255),
    guardado_exitoso BOOLEAN DEFAULT TRUE,
    mensaje_error VARCHAR(255),
    CONSTRAINT fk_evidencias_eventos
        FOREIGN KEY (id_evento) REFERENCES eventos_riesgo(id_evento)        
);

CREATE TABLE ubicaciones (
    id_ubicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),
    direccion_aproximada VARCHAR(255),
    fecha_ubicacion DATETIME NOT NULL ,
    obtenido_exitosamente BOOLEAN DEFAULT TRUE,
    mensaje_error VARCHAR(255),
    CONSTRAINT fk_ubicaciones_eventos
        FOREIGN KEY (id_evento) REFERENCES eventos_riesgo(id_evento)        
);

CREATE TABLE notificaciones_emergencia (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    id_contacto INT NOT NULL,
    id_ubicacion INT,
    id_evidencia INT,
    canal ENUM('SMS', 'WhatsApp', 'Correo', 'Llamada') NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio DATETIME ,
    estado_envio ENUM('Pendiente', 'Enviada', 'Fallida') DEFAULT 'Pendiente',
    respuesta_servicio TEXT,
    CONSTRAINT fk_notificaciones_eventos
        FOREIGN KEY (id_evento) REFERENCES eventos_riesgo(id_evento),
    CONSTRAINT fk_notificaciones_contactos
        FOREIGN KEY (id_contacto) REFERENCES contactos_emergencia(id_contacto),
    CONSTRAINT fk_notificaciones_ubicaciones
        FOREIGN KEY (id_ubicacion) REFERENCES ubicaciones(id_ubicacion),
    CONSTRAINT fk_notificaciones_evidencias
        FOREIGN KEY (id_evidencia) REFERENCES evidencias_visuales(id_evidencia)        
);

CREATE TABLE historial_incidentes (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    id_usuario_consulta INT,
    fecha_registro DATETIME ,
    estado_incidente ENUM('Abierto', 'En revisión', 'Cerrado', 'Descartado') DEFAULT 'Abierto',
    observacion TEXT,
    CONSTRAINT fk_historial_eventos
        FOREIGN KEY (id_evento) REFERENCES eventos_riesgo(id_evento),
    CONSTRAINT fk_historial_usuarios
        FOREIGN KEY (id_usuario_consulta) REFERENCES usuarios(id_usuario)        
);

CREATE TABLE bitacora_auditoria (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion VARCHAR(120) NOT NULL,
    tabla_afectada VARCHAR(80),
    id_registro_afectado INT,
    descripcion TEXT,
    fecha_accion DATETIME ,
    direccion_ip VARCHAR(45),
    CONSTRAINT fk_bitacora_usuarios
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)        
);

CREATE TABLE fallas_sistema (
    id_falla INT AUTO_INCREMENT PRIMARY KEY,
    id_sesion INT,
    componente ENUM('Cámara', 'Mensajería', 'Conectividad', 'Geolocalización', 'Base de datos', 'Otro') NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_falla DATETIME ,
    nivel_gravedad ENUM('Bajo', 'Medio', 'Alto', 'Crítico') DEFAULT 'Medio',
    estado ENUM('Registrada', 'En revisión', 'Solucionada') DEFAULT 'Registrada',
    CONSTRAINT fk_fallas_sesiones
        FOREIGN KEY (id_sesion) REFERENCES sesiones_monitoreo(id_sesion)        
);