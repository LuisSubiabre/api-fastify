import EstudianteModel from "../models/estudiante.model.js";
import transporter from "../config/email.js";

class PasswordService {
  async recuperarClave(rut) {
    try {
      // Buscar al estudiante por RUT
      const estudiante = await EstudianteModel.findOne({
        where: { rut },
      });

      if (!estudiante) {
        throw new Error("No se encontró ningún estudiante con ese RUT");
      }

      // Configurar el correo electrónico
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: estudiante.email,
        subject: "Recuperación de Contraseña",
        html: `
          <h1>Recuperación de Contraseña</h1>
          <p>Hola ${estudiante.nombre},</p>
          <p>Tu contraseña actual para ingresar a la Plataforma Estudiante es: <strong>${estudiante.rut}</strong></p>
          <p>Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión.</p>
          <p>Si no solicitaste esta recuperación de contraseña, por favor ignora este correo.</p>
        `,
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);

      return {
        message: "Se ha enviado un correo con tu contraseña",
        email: estudiante.email,
      };
    } catch (error) {
      console.error("Error en la recuperación de contraseña:", error);
      throw error;
    }
  }
}

export default PasswordService;
