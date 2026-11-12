// Constantes y ENUMs

// Constantes de Provincias de España para devolver en la ruta de localización de articulos
// Se guardan en el campo 'localizacion' (VARCHAR) de la tabla 'articulos'

export const PROVINCIAS = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
    'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
    'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona',
    'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
    'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida',
    'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
    'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo',
    'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

// Roles de usuarios  

export const ROLES = {
  USUARIO: 'USUARIO',
  MODERADOR: 'MODERADOR',
  ADMINISTRADOR: 'ADMINISTRADOR',
};

// Tallas de artículos 

export const TALLAS = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL',
  UNICA: 'UNICA',
};


// Clasificación de artículos por género 

export const GENEROS = {
  H: 'H',
  M: 'M',
  UNISEX: 'UNISEX',
};

// Estado de conservación de los artículos 

export const ESTADO_CONSERVACION = {
  NUEVO: 'NUEVO',
  COMO_NUEVO: 'COMO_NUEVO',
  BUEN_ESTADO: 'BUEN_ESTADO',
  ACEPTABLE: 'ACEPTABLE',
};

// Estado de los artículos según su ciclo de vida 

export const ESTADO_ARTICULO = {
  BORRADOR: 'BORRADOR',
  PUBLICADO: 'PUBLICADO',
  EN_REVISION: 'EN_REVISION',
  RETIRADO: 'RETIRADO',
  VENDIDO: 'VENDIDO',
};

// Estado del reporte 

export const ESTADO_REPORTE = {
  PENDIENTE: 'PENDIENTE',
  EN_REVISION: 'EN_REVISION',
  REVISADO: 'REVISADO',
};
