import EstudianteModel from "../models/estudiante.model.js";
import CursoModel from "../models/curso.model.js"; // Asegúrate de importar el modelo Curso
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  // Genera un token JWT
  generateToken(estudiante) {
    const payload = {
      estudiante_id: estudiante.estudiante_id,
      email: estudiante.email,
      rut: estudiante.rut,
      curso_id: estudiante.curso_id,
      curso_nombre: estudiante.Curso ? estudiante.Curso.nombre : null, // Verifica si el curso existe
      nombre: estudiante.nombre,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  // Autentica un estudiante
  async autenticar(email, clave) {
    // Aquí cargas al estudiante con el curso
    const estudiante = await EstudianteModel.findOne({
      where: { email },
      include: {
        model: CursoModel, // Asegúrate de incluir el curso
        attributes: ["nombre"], // Solo traemos el nombre del curso
      },
    });

    if (!estudiante) {
      throw new Error(
        "Usuario o contraseña inválidos"
      );
    }

    const claveValida = await bcrypt.compare(clave, estudiante.clave);
    if (!claveValida) {
      throw new Error("Email o password incorrectos");
    }

    return this.generateToken(estudiante);
  }

  // Verifica si un token JWT es válido
  async verifyToken(token) {
    try {
      // Verifica y decodifica el token usando la clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Si el token es válido, devuelve true
      return !!decoded;
    } catch (error) {
      console.error("Error verificando el token:", error);

      // Si el token es inválido o ha expirado, devuelve false
      return false;
    }
  }
}

export default AuthService;
