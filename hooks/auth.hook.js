// Hook para verificar la autenticación de un estudiante mediante el JWT
// Se ejecuta antes de cada petición
// Si el token es válido, agrega el estudiante al objeto request
// Si el token no es válido, responde con un mensaje de error
// Para usar este hook, agregarlo a las rutas que requieran autenticación

import jwt from "jsonwebtoken";

export default async function authHook(request, reply) {
  try {
    // Extrae el token del header de la petición
    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Token no encontrado");
    }

    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agrega el estudiante al objeto request
    request.estudiante = decoded;

    return;
  } catch (error) {
    console.error("Email y/o password incorrectas:", error);
    reply.status(401).send({ message: "Token inválido o expirado" });
  }
}
